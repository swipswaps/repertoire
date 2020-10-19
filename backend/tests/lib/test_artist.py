from sqlite3 import Cursor

import pytest

from backend.errors import Duplicate
from backend.lib import artist


def test_from_id_success(db: Cursor, snapshot):
    snapshot.assert_match(artist.from_id(2, db))


def test_from_id_failure(db: Cursor):
    assert artist.from_id(90000, db) is None


def test_from_name_success(db: Cursor):
    art = artist.from_name("aaron west and the roaring twenties", db)
    assert art.name == "Aaron West and the Roaring Twenties"


def test_from_name_failure(db: Cursor):
    assert artist.from_name("nonexistent", db) is None


def test_all(db: Cursor, snapshot):
    artists = artist.all(db)
    assert all(art.num_releases for art in artists)
    snapshot.assert_match(artists)


def test_create(db: Cursor):
    art = artist.create("new artist", favorite=True, cursor=db)
    assert art.id == 5
    assert art == artist.from_id(5, db)


def test_create_duplicate(db: Cursor):
    with pytest.raises(Duplicate):
        artist.create("aaron west and the roaring twenties", db)


def test_releases(db: Cursor, snapshot):
    art = artist.from_id(2, db)
    snapshot.assert_match(artist.releases(art, db))


def test_top_genres(db: Cursor, snapshot):
    art = artist.from_id(2, db)
    snapshot.assert_match(artist.top_genres(art, db))
