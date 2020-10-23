from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import date, datetime
from itertools import chain, repeat
from pathlib import Path
from sqlite3 import Cursor, Row
from typing import Any, Dict, List, Optional, Tuple

from unidecode import unidecode

from backend.enums import CollectionType, ReleaseSort, ReleaseType
from backend.errors import AlreadyExists, DoesNotExist, Duplicate
from backend.util import strip_punctuation

from . import artist, collection, track


@dataclass(frozen=True)
class T:
    """
    A release dataclass. This dataclass is frozen (immutable).
    """

    # We have these empty comments so that the attributes and types render in sphinx...
    #:
    id: int
    #:
    title: str
    #: The type of this release.
    release_type: ReleaseType
    #: When this release was added to the server.
    added_on: datetime
    #: The year this release was released.
    release_year: int
    #: The number of tracks that this release has.
    num_tracks: int
    # Whether this release is in the inbox.
    in_inbox: bool
    #: The date this release was released.
    release_date: Optional[date] = None
    #: The filepath of the album cover.
    image_path: Optional[Path] = None


def from_row(row: Row) -> T:
    """
    Return a release dataclass containing data from a row from the database.

    :param row: A row from the database.
    :return: A release dataclass.
    """
    return T(
        **dict(
            row,
            release_type=ReleaseType(row["release_type"]),
            in_inbox=bool(row["in_inbox"]),
            image_path=Path(row["image_path"]) if row["image_path"] else None,
        )
    )


def from_id(id: int, cursor: Cursor) -> Optional[T]:
    """
    Return the release with the provided ID.

    :param id: The ID of the release to fetch.
    :param cursor: A cursor to the database.
    :return: The release with the provided ID, if it exists.
    """
    cursor.execute(
        """
        SELECT
            rls.*,
            COUNT(trks.id) AS num_tracks,
            (
                SELECT 1
                FROM music__collections_releases
                WHERE release_id = rls.id AND collection_id = 1
            ) AS in_inbox
        FROM music__releases AS rls
            LEFT JOIN music__tracks AS trks ON trks.release_id = rls.id
        WHERE rls.id = ?
        GROUP BY rls.id
        """,
        (id,),
    )

    if row := cursor.fetchone():
        return from_row(row)


def search(
    cursor: Cursor,
    *,
    search: str = "",
    collections: List[collection.T] = [],
    artists: List[artist.T] = [],
    release_types: List[ReleaseType] = [],
    page: int = 1,
    per_page: Optional[int] = None,
    sort: ReleaseSort = ReleaseSort.RECENTLY_ADDED,
    asc: bool = True,
) -> Tuple[int, List[T]]:
    """
    Search for releases matching the passed-in criteria.

    :param search: A search string. We split this up into individual punctuation-less
                   words and return releases that contain each word.
    :param collections: A list of collections. We match releases by the collections in
                        this list. For a release to match, it must be in all collections
                        in this list.
    :param artists: A list of artists. We match releases by the artists in this list. For
                    a release to match, all artists in this list must be included.
    :param release_types: A list of release types. Filter out releases that do not match
                          one of the release types in this list.
    :param page: Which page of releases to return.
    :param per_page: The number of releases per-page. Pass ``None`` to return all
                     releases (this will ignore ``page``).
    :param sort: How to sort the matching releases.
    :param asc: If true, sort in ascending order. If false, descending.
    :param cursor: A cursor to the database.
    :return: The total number of matching releases and the matching releases on the
             current page.
    """
    # Dynamically generate the filter SQL and filter params.
    filter_sql = []
    filter_params = []

    for sql, params in [
        _generate_collection_filter(collections),
        _generate_artist_filter(artists),
        _generate_release_types_filter(release_types),
        _generate_search_filter(search),
    ]:
        filter_sql.extend(sql)
        filter_params.extend(params)

    # Fetch the total number of releases matching this criteria (ignoring pages).
    cursor.execute(
        f"""
        SELECT COUNT(1)
        FROM music__releases AS rls
        {"WHERE " + " AND ".join(filter_sql) if filter_sql else ""}
        """,
        filter_params,
    )
    total = cursor.fetchone()[0]

    # If we have pagination, add the pagination params to the filter SQL.
    if per_page:
        filter_params.extend([per_page, (page - 1) * per_page])

    # Fetch the releases on the current page.
    cursor.execute(
        f"""
        SELECT
            rls.*,
            COUNT(trks.id) AS num_tracks,
            (
                SELECT 1
                FROM music__collections_releases
                WHERE release_id = rls.id AND collection_id = 1
            ) AS in_inbox
        FROM music__releases AS rls
            LEFT JOIN music__tracks AS trks ON trks.release_id = rls.id
        {"WHERE " + " AND ".join(filter_sql) if filter_sql else ""}
        GROUP BY rls.id
        ORDER BY {sort.value} {"ASC" if asc else "DESC"}
        {"LIMIT ? OFFSET ?" if per_page else ""}
        """,
        filter_params,
    )

    return total, [from_row(row) for row in cursor.fetchall()]


def _generate_collection_filter(
    collections: List[collection.T],
) -> Tuple[List[str], List[int]]:
    """
    Generate the SQL and params for filtering on collections.

    :param collections: The collections to filter on.
    :return: The filter SQL and query parameters.
    """
    sql = """
          EXISTS (
              SELECT 1 FROM music__collections_releases
              WHERE release_id = rls.id AND collection_id = ?
          )
          """

    filter_sql = repeat(sql, len(collections))
    filter_params = [c.id for c in collections]

    return filter_sql, filter_params


def _generate_artist_filter(
    artists: List[artist.T],
) -> Tuple[List[str], List[int]]:
    """
    Generate the SQL and params for filtering on artists.

    :param artists: The artists to filter on.
    :return: The filter SQL and query parameters.
    """
    sql = """
          EXISTS (
              SELECT 1 FROM music__releases_artists
              WHERE release_id = rls.id AND artist_id = ?
          )
          """

    filter_sql = repeat(sql, len(artists))
    filter_params = [a.id for a in artists]

    return filter_sql, filter_params


def _generate_release_types_filter(
    release_types: List[ReleaseType],
) -> Tuple[List[str], List[int]]:
    """
    Generate the SQL and params for filtering on the release types.

    :param release_types: The release types to filter on.
    :return: The filter SQL and query parameters.
    """
    if not release_types:
        return [], []

    filter_sql = [f"rls.release_type IN ({', '.join('?' * len(release_types))})"]
    filter_params = [rtype.value for rtype in release_types]

    return filter_sql, filter_params


def _generate_search_filter(search: str) -> Tuple[List[str], List[str]]:
    """
    Generate the SQL and params for filtering on the search words.

    :param search: The search words to filter on.
    :return: The filter SQL and query parameters.
    """
    sql = """
          EXISTS (
              SELECT 1 FROM music__releases_search_index
              WHERE (word = ? OR word = ?) AND release_id = rls.id
          )
          """

    words = [w for w in strip_punctuation(search).split(" ") if w]

    filter_sql = repeat(sql, len(words))
    filter_params = chain(*((word, unidecode(word)) for word in words))

    return filter_sql, filter_params


def create(
    title: str,
    artists: List[artist.T],
    release_type: ReleaseType,
    release_year: int,
    cursor: Cursor,
    release_date: date = None,
    image_path: Path = None,
) -> T:
    """
    Create a release with the provided parameters.

    :param title: The title of the release.
    :param artists: The "album artists" on the release.
    :param release_type: The type of the release.
    :param release_year: The year the release came out.
    :param cursor: A cursor to the database.
    :param release_date: The date the release came out.
    :param image_path: A path to the release's cover art.
    :return: The newly created release.
    :raises Duplicate: If a release with the same name and artists already exists. The
                       duplicate release is passed as the ``entity`` argument.
    """
    if rls := _find_duplicate_release(title, artists, cursor):
        raise Duplicate(rls)

    # Insert the release into the database.
    cursor.execute(
        """
        INSERT INTO music__releases (
            title, image_path, release_type, release_year, release_date
        ) VALUES (?, ?, ?, ?, ?)
        """,
        (title, image_path, release_type.value, release_year, release_date),
    )
    cursor.connection.commit()
    id = cursor.lastrowid

    # Insert the release artists into the database.
    for art in artists:
        cursor.execute(
            """
            INSERT INTO music__releases_artists (release_id, artist_id) VALUES (?, ?)
            """,
            (id, art.id),
        )
    cursor.connection.commit()

    # We fetch it from the database to also get the `added_on` column.
    return from_id(id, cursor)


def _find_duplicate_release(
    title: str, artists: List[artist.T], cursor: Cursor
) -> Optional[T]:
    """
    Try to find a duplicate release with the given title and artists. If we find a
    duplicate release, return it.

    :param title: The title of the release.
    :param artists: The artists that contributed to the release.
    :param cursor: A cursor to the database.
    :return: The duplicate release, if found.
    """
    # First fetch all releases with the same title.
    cursor.execute(
        """
        SELECT
            rls.*,
            COUNT(trks.id) AS num_tracks,
            (
                SELECT 1
                FROM music__collections_releases
                WHERE release_id = rls.id AND collection_id = 1
            ) AS in_inbox
        FROM music__releases AS rls
            LEFT JOIN music__tracks AS trks ON trks.release_id = rls.id
        WHERE rls.title = ?
        GROUP BY rls.id
        """,
        (title,),
    )

    # Construct a lowercase set of artists for a future case-insensitive comparison.
    provided_artists = {art.name.lower() for art in artists}

    for row in cursor.fetchall():
        # For each release with the same title, compare the artists.
        cursor.execute(
            """
            SELECT name
            FROM music__artists AS arts
            INNER JOIN music__releases_artists AS relarts
                ON relarts.artist_id = arts.id
            WHERE relarts.release_id = ?
            """,
            (row["id"],),
        )

        # Compare the artists of this release with our provided artists.
        if provided_artists == {row["name"].lower() for row in cursor.fetchall()}:
            # If they match, return this release, as it is a duplicate.
            return from_row(row)


def update(rls: T, cursor: Cursor, **changes: Dict[str, Any]) -> T:
    """
    Update a release and persist changes to the database. To update a value, pass it
    in as a keyword argument. To keep the original value, do not pass in a keyword
    argument.

    :param rls: The release to update.
    :param cursor: A cursor to the database.
    :param title: New release title.
    :type  title: :py:obj:`str`
    :param release_type: New release type.
    :type  release_type: :py:obj:`backend.enums.ReleaseType`
    :param release_year: New release year.
    :type  release_year: :py:obj:`int`
    :param release_date: New release date.
    :type  release_date: :py:obj:`datetime.date`
    :return: The updated release.
    """
    cursor.execute(
        """
        UPDATE music__releases
        SET title = ?,
            release_type = ?,
            release_year = ?,
            release_date = ?
        WHERE id = ?
        """,
        (
            changes.get("title", rls.title),
            changes.get("release_type", rls.release_type).value,
            changes.get("release_year", rls.release_year),
            changes.get("release_date", rls.release_date),
            rls.id,
        ),
    )
    cursor.connection.commit()

    return T(**dict(asdict(rls), **changes))


def tracks(rls: T, cursor: Cursor) -> List[track.T]:
    """
    Get the tracks of the provided release.

    :param rls: The provided release.
    :param cursor: A cursor to the database.
    :return: The tracks of the provided release.
    """
    cursor.execute("SELECT * FROM music__tracks WHERE release_id = ?", (rls.id,))
    return [track.from_row(row) for row in cursor.fetchall()]


def artists(rls: T, cursor: Cursor) -> List[artist.T]:
    """
    Get the "album artists" of the provided release.

    :param rls: The provided release.
    :param cursor: A cursor to the datbase.
    :return: The "album artists" of the provided release.
    """
    cursor.execute(
        """
        SELECT
            artists.*,
            COUNT(rlsarts.release_id) AS num_releases
        FROM (
            SELECT arts.*
            FROM music__releases_artists AS rlsarts
            JOIN music__artists AS arts ON arts.id = rlsarts.artist_id
            WHERE rlsarts.release_id = ?
            GROUP BY arts.id
        ) AS artists
        JOIN music__releases_artists AS rlsarts ON rlsarts.artist_id = artists.id
        GROUP BY artists.id
        """,
        (rls.id,),
    )
    return [artist.from_row(row) for row in cursor.fetchall()]


def add_artist(rls: T, art: artist.T, cursor: Cursor) -> None:
    """
    Add the provided artist to the provided release.

    :param rls: The release to add the artist to.
    :param art: The artist to add.
    :param cursor: A cursor to the database.
    :raises AlreadyExists: If the artist is already on the release.
    """
    cursor.execute(
        "SELECT 1 FROM music__releases_artists WHERE release_id = ? AND artist_id = ?",
        (rls.id, art.id),
    )
    if cursor.fetchone():
        raise AlreadyExists

    cursor.execute(
        "INSERT INTO music__releases_artists (release_id, artist_id) VALUES (?, ?)",
        (rls.id, art.id),
    )
    cursor.connection.commit()


def del_artist(rls: T, art: artist.T, cursor: Cursor) -> None:
    """
    Delete the provided artist to the provided release.

    :param rls: The release to delete the artist from.
    :param art: The artist to delete.
    :param cursor: A cursor to the database.
    :raises DoesNotExist: If the artist is not on the release.
    """
    cursor.execute(
        "SELECT 1 FROM music__releases_artists WHERE release_id = ? AND artist_id = ?",
        (rls.id, art.id),
    )
    if not cursor.fetchone():
        raise DoesNotExist

    cursor.execute(
        "DELETE FROM music__releases_artists WHERE release_id = ? AND artist_id = ?",
        (rls.id, art.id),
    )
    cursor.connection.commit()


def collections(
    rls: T, cursor: Cursor, type: CollectionType = None
) -> List[collection.T]:
    """
    Get the collections that contain the provided release.

    :param rls: The provided release.
    :param cursor: A cursor to the datbase.
    :param type: The type of collections to fetch. Leave ``None`` to fetch all.
    :return: The collections that contain the provided release.
    """
    cursor.execute(
        f"""
        SELECT
            collections.*,
            COUNT(colsrls.release_id) AS num_releases,
            MAX(colsrls.added_on) AS last_updated_on
        FROM (
            SELECT cols.*
            FROM music__collections AS cols
            JOIN music__collections_releases AS colsrls
                ON colsrls.collection_id = cols.id
            WHERE colsrls.release_id = ?
                {"AND cols.type = ?" if type else ""}
            GROUP BY cols.id
        ) AS collections
        JOIN music__collections_releases AS colsrls
            ON colsrls.collection_id = collections.id
        GROUP BY collections.id
        """,
        (rls.id, *((type.value,) if type else ())),
    )
    return [collection.from_row(row) for row in cursor.fetchall()]