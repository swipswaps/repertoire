from sqlite3 import Cursor

import pytest

from backend.enums import CollectionType
from backend.errors import AlreadyExists, CannotUpdate, DoesNotExist, Duplicate
from backend.library import collection, release


def test_from_id_success(db: Cursor, snapshot):
    snapshot.assert_match(collection.from_id(16, db))


def test_from_id_failure(db: Cursor):
    assert collection.from_id(90000, db) is None


def test_from_name_and_type_success(db: Cursor):
    col = collection.from_name_and_type("Electronic", CollectionType.GENRE, db)
    assert col.name == "Electronic"
    assert col.type == CollectionType.GENRE


def test_from_name_and_type_failure(db: Cursor):
    col1 = collection.from_name_and_type("Electronic", CollectionType.COLLAGE, db)
    col2 = collection.from_name_and_type("Inb0x", CollectionType.SYSTEM, db)

    assert col1 is None
    assert col2 is None


def test_all(db: Cursor, snapshot):
    collections = collection.all(db)
    snapshot.assert_match(collections)


def test_all_filter_type(db: Cursor, snapshot):
    collections = collection.all(db, type=CollectionType.SYSTEM)
    snapshot.assert_match(collections)


def test_create(db: Cursor):
    col = collection.create(
        "new collage", CollectionType.COLLAGE, favorite=True, cursor=db
    )
    assert col.id == 21
    assert col == collection.from_id(21, db)


def test_create_duplicate(db: Cursor):
    with pytest.raises(Duplicate):
        collection.create("Folk", CollectionType.GENRE, db)


def test_update_fields(db: Cursor, snapshot):
    col = collection.update(
        collection.from_id(13, db),
        cursor=db,
        name="New Name",
        type=CollectionType.COLLAGE,
        favorite=True,
    )
    snapshot.assert_match(col)
    assert col == collection.from_id(13, db)


def test_update_nothing(db: Cursor):
    col = collection.from_id(13, db)
    new_col = collection.update(col, cursor=db)
    assert col == new_col


@pytest.mark.parametrize("col_id", [1, 3])
def test_update_cannot(db: Cursor, col_id):
    with pytest.raises(CannotUpdate):
        collection.update(
            collection.from_id(col_id, db), cursor=db, type=CollectionType.COLLAGE
        )


@pytest.mark.parametrize("type", [CollectionType.SYSTEM, CollectionType.RATING])
def test_update_to_cannot(db: Cursor, type):
    with pytest.raises(CannotUpdate):
        collection.update(collection.from_id(13, db), cursor=db, type=type)


@pytest.mark.parametrize("col_id", [1, 3])
def test_update_favorite_cannots(db: Cursor, col_id):
    col = collection.update(collection.from_id(col_id, db), cursor=db, favorite=True)
    assert col.favorite is True
    assert col == collection.from_id(col_id, db)


def test_releases(db: Cursor, snapshot):
    art = collection.from_id(16, db)
    snapshot.assert_match(collection.releases(art, db))


def test_add_release(db: Cursor, snapshot):
    col = collection.from_id(3, db)
    rls = release.from_id(2, db)

    collection.add_release(col, rls, db)
    snapshot.assert_match(collection.releases(col, db))


def test_add_release_failure(db: Cursor):
    col = collection.from_id(12, db)
    rls = release.from_id(2, db)

    with pytest.raises(AlreadyExists):
        collection.add_release(col, rls, db)


def test_del_release(db: Cursor, snapshot):
    col = collection.from_id(12, db)
    rls = release.from_id(2, db)

    collection.del_release(col, rls, db)
    snapshot.assert_match(collection.releases(col, db))


def test_del_release_failure(db: Cursor):
    col = collection.from_id(3, db)
    rls = release.from_id(2, db)

    with pytest.raises(DoesNotExist):
        collection.del_release(col, rls, db)


def test_top_genres(db: Cursor, snapshot):
    art = collection.from_id(16, db)
    snapshot.assert_match(collection.top_genres(art, db))