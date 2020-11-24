-- This file is for documentation purposes only.
-- It is autogenerated from the migrations, please do NOT edit!

CREATE TABLE music__releases (
    id INTEGER NOT NULL,
    title VARCHAR NOT NULL,
    release_type INTEGER NOT NULL DEFAULT 1,
    release_year INTEGER NOT NULL DEFAULT 0,
    release_date DATE,
    image_path VARCHAR,
    added_on TIMESTAMP DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (release_type) REFERENCES music__release_types(id)
);

CREATE TABLE music__release_types (
    id INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (type)
);

CREATE TABLE music__artists (
    id INTEGER NOT NULL,
    name VARCHAR COLLATE "NOCASE" NOT NULL,
    starred BOOLEAN NOT NULL DEFAULT 0 CHECK (starred IN (0, 1)),
    PRIMARY KEY (id),
    UNIQUE (name) -- We will have this constraint for now...
);

CREATE TABLE music__artist_roles (
    id INTEGER NOT NULL,
    role VARCHAR NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (role)
);

CREATE TABLE music__releases_artists (
    release_id INTEGER NOT NULL,
    artist_id INTEGER NOT NULL,
    PRIMARY KEY (release_id, artist_id),
    FOREIGN KEY (release_id) REFERENCES music__releases (id),
    FOREIGN KEY (artist_id) REFERENCES music__artists (id)
);

CREATE TABLE music__tracks (
    id INTEGER NOT NULL,
    filepath VARCHAR NOT NULL,
    sha256 BLOB NOT NULL,
    title VARCHAR NOT NULL DEFAULT "Untitled",
    release_id INTEGER NOT NULL DEFAULT 1,
    track_number VARCHAR NOT NULL DEFAULT 1,
    disc_number VARCHAR NOT NULL DEFAULT 1,
    duration INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (release_id) REFERENCES music__releases (id),
    UNIQUE (filepath),
    UNIQUE (sha256)
);

CREATE TABLE music__tracks_artists (
    track_id INTEGER NOT NULL,
    artist_id INTEGER NOT NULL,
    role INTEGER NOT NULL,
    PRIMARY KEY (track_id, artist_id, role),
    FOREIGN KEY (track_id) REFERENCES music__tracks (id),
    FOREIGN KEY (artist_id) REFERENCES music__artists (id),
    FOREIGN KEY (role) REFERENCES music__artist_roles (id)
);

CREATE TABLE music__collections (
    id INTEGER NOT NULL,
    name VARCHAR COLLATE "NOCASE" NOT NULL,
    starred BOOLEAN NOT NULL DEFAULT 0 CHECK (starred IN (0, 1)),
    type INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (type) REFERENCES music__collection_types(id),
    UNIQUE (name, type)
);

CREATE TABLE music__collection_types (
    id INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (type)
);

CREATE TABLE music__collections_releases (
    collection_id INTEGER NOT NULL,
    release_id INTEGER NOT NULL,
    added_on TIMESTAMP DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    PRIMARY KEY (release_id, collection_id),
    FOREIGN KEY (release_id) REFERENCES music__releases(id) ON DELETE CASCADE,
    FOREIGN KEY (collection_id) REFERENCES music__collections(id) ON DELETE CASCADE
);

CREATE TABLE music__releases_search_index (
    id INTEGER NOT NULL,
    release_id INTEGER NOT NULL,
    word VARCHAR COLLATE "NOCASE" NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (release_id) REFERENCES music__releases(id) ON DELETE CASCADE
);

CREATE TABLE music__releases_to_fetch_images (
    release_id INTEGER NOT NULL,
    PRIMARY KEY (release_id),
    FOREIGN KEY (release_id) REFERENCES music__releases(id) ON DELETE CASCADE
);

CREATE TABLE system__users (
    id INTEGER NOT NULL,
    username VARCHAR NOT NULL,
    token_prefix BLOB NOT NULL,
    token_hash VARCHAR NOT NULL,
    csrf_token BLOB NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (token_prefix)
);

CREATE TABLE system__secret_key (
    key BLOB NOT NULL,
    PRIMARY KEY (key)
);