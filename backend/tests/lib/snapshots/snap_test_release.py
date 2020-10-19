# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import GenericRepr, Snapshot


snapshots = Snapshot()

snapshots['test_release_artists 1'] = [
    GenericRepr("T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None)")
]

snapshots['test_release_collections 1'] = [
    GenericRepr("T(id=1, name='Inbox', favorite=False, type=<CollectionType.SYSTEM: 1>, num_releases=None, last_updated_on=None)"),
    GenericRepr("T(id=12, name='Folk', favorite=False, type=<CollectionType.GENRE: 4>, num_releases=None, last_updated_on=None)"),
    GenericRepr("T(id=13, name='Rock', favorite=False, type=<CollectionType.GENRE: 4>, num_releases=None, last_updated_on=None)"),
    GenericRepr("T(id=14, name='Country', favorite=False, type=<CollectionType.GENRE: 4>, num_releases=None, last_updated_on=None)"),
    GenericRepr("T(id=15, name='World', favorite=False, type=<CollectionType.GENRE: 4>, num_releases=None, last_updated_on=None)")
]

snapshots['test_release_from_id_success 1'] = GenericRepr("T(id=2, title='We Don’t Have Each Other', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 0, 25, 34), release_year=2014, release_date=datetime.date(2014, 7, 8), image_path=PosixPath('/data/cover_art/fb21f22d84bb812bb8bd1988ee89c3a91f1d41e92cf988ef774423e9d85e3292.jpg'), num_tracks=10)")

snapshots['test_release_search_all 1'] = (
    3,
    [
        GenericRepr("T(id=1, title='Unknown Release', release_type=<ReleaseType.UNKNOWN: 12>, added_on=datetime.datetime(1970, 1, 1, 0, 0), release_year=0, release_date=None, image_path=None, num_tracks=None)"),
        GenericRepr("T(id=2, title='We Don’t Have Each Other', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 0, 25, 34), release_year=2014, release_date=datetime.date(2014, 7, 8), image_path=PosixPath('/data/cover_art/fb21f22d84bb812bb8bd1988ee89c3a91f1d41e92cf988ef774423e9d85e3292.jpg'), num_tracks=None)"),
        GenericRepr("T(id=3, title='Departure', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 8, 29, 34), release_year=2016, release_date=None, image_path=PosixPath('/data/cover_art/d832df509b44cb7c560e2579453178016c391cd2ab8d6eab3de2bbbdf75c4ac0.jpg'), num_tracks=None)")
    ]
)

snapshots['test_release_search_page 1'] = (
    3,
    [
        GenericRepr("T(id=1, title='Unknown Release', release_type=<ReleaseType.UNKNOWN: 12>, added_on=datetime.datetime(1970, 1, 1, 0, 0), release_year=0, release_date=None, image_path=None, num_tracks=None)"),
        GenericRepr("T(id=2, title='We Don’t Have Each Other', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 0, 25, 34), release_year=2014, release_date=datetime.date(2014, 7, 8), image_path=PosixPath('/data/cover_art/fb21f22d84bb812bb8bd1988ee89c3a91f1d41e92cf988ef774423e9d85e3292.jpg'), num_tracks=None)")
    ]
)

snapshots['test_release_search_page_2 1'] = (
    3,
    [
        GenericRepr("T(id=3, title='Departure', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 8, 29, 34), release_year=2016, release_date=None, image_path=PosixPath('/data/cover_art/d832df509b44cb7c560e2579453178016c391cd2ab8d6eab3de2bbbdf75c4ac0.jpg'), num_tracks=None)")
    ]
)

snapshots['test_release_search_search 1'] = (
    1,
    [
        GenericRepr("T(id=2, title='We Don’t Have Each Other', release_type=<ReleaseType.ALBUM: 1>, added_on=datetime.datetime(2020, 10, 19, 0, 25, 34), release_year=2014, release_date=datetime.date(2014, 7, 8), image_path=PosixPath('/data/cover_art/fb21f22d84bb812bb8bd1988ee89c3a91f1d41e92cf988ef774423e9d85e3292.jpg'), num_tracks=None)")
    ]
)

snapshots['test_release_tracks 1'] = [
    GenericRepr("T(id=1, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/01. Our Apartment.m4a'), sha256=b'u\\xca\\x14C!e\\xa9\\xee\\x87\\xeec\\xdfeN\\xf7\\x7fE\\xd0\\t\\xbb\\xe5}\\xa0a\\nE<H\\xc6\\xb2j\\x1a', title='Our Apartment', release_id=2, duration=213, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='1', disc_number='1')"),
    GenericRepr("T(id=2, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/02. Grapefruit.m4a'), sha256=b'\\xb8^\\xf2tc\\x9c\\x13\\x1e\\xb69\\xe9\\x84;Q\\xc0\\xe0(\\xa8p\\xe3o\\xb4\\xe1\\xd8a\\xe48\\xd6\\x82\\x1f\\xaev', title='Grapefruit', release_id=2, duration=252, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='2', disc_number='1')"),
    GenericRepr('T(id=3, filepath=PosixPath(\'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/03. St. Joe Keeps Us Safe.m4a\'), sha256=b\'\\x9c",\\xae\\xc4\\xb1\\x88\\x19\\xeb\\xefK\\xfa\\xf7Z\\xc3\\x19r+\\xfa?\\x96`\\xda\\xa3Ss+\\x13\\x9a\\xabV\\x96\', title=\'St. Joe Keeps Us Safe\', release_id=2, duration=210, artists=[{\'artist\': T(id=2, name=\'Aaron West and the Roaring Twenties\', favorite=False, num_releases=None), \'role\': <ArtistRoles.MAIN: 1>}], track_number=\'3\', disc_number=\'1\')'),
    GenericRepr("T(id=4, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/04. Runnin’ Scared.m4a'), sha256=b'\\x9e\\x00\\xa1\\x88z\\x87\\xe8\\xa6+wh\\xf76\\xfb0\\x06\\xf6\\x8b\\xb1@\\x07\\xa7B$\\x1e\\xd7%\\xb9!!P\\xd4', title='Runnin’ Scared', release_id=2, duration=193, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='4', disc_number='1')"),
    GenericRepr("T(id=5, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/05. Divorce and the American South.m4a'), sha256=b'=\\xb4_\\x13\\r\\x83`x\\xf3\\xba\\xf5\\xc9\\xa6\\x80\\x9ax\\xa2\\x14\\xc2\\xa8\\x1f\\x9f\\xa7}xr]*?\\xa4\\x90\\xe0', title='Divorce and the American South', release_id=2, duration=259, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='5', disc_number='1')"),
    GenericRepr("T(id=6, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/06. The Thunderbird Inn.m4a'), sha256=b'\\xa9G206\\xd9\\x99\\x83GI\\x8a\\xa3f-V\\x01;\\xdd\\x02\\r\\xfd\\x9f\\xb1\\x03\\x8a\\xb1?\\xc5\\xf99\\x91;', title='The Thunderbird Inn', release_id=2, duration=199, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='6', disc_number='1')"),
    GenericRepr('T(id=7, filepath=PosixPath(\'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/07. Get Me Out of Here Alive.m4a\'), sha256=b\'sT+\\xbe\\xcd\\x04h>XD@V}\\xae\\x8a\\xe2\\x01\\x91\\x84\\x1e=]\\x0c\\x93bS"\\x8a\\xfd\\xde\\xabB\', title=\'Get Me Out of Here Alive\', release_id=2, duration=212, artists=[{\'artist\': T(id=2, name=\'Aaron West and the Roaring Twenties\', favorite=False, num_releases=None), \'role\': <ArtistRoles.MAIN: 1>}], track_number=\'7\', disc_number=\'1\')'),
    GenericRepr("T(id=8, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/08. You Ain’t No Saint.m4a'), sha256=b'~\\x95\\xadd&n\\x12(\\x0bs\\xed3\\xbf\\xfa\\xa0\\xfc0\\xaez\\xec\\xe7Z\\xa7\\xb5\\x0b\\x81D\\x94\\xdb\\xd0\\xb1\\x11', title='You Ain’t No Saint', release_id=2, duration=265, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='8', disc_number='1')"),
    GenericRepr("T(id=9, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/09. Carolina Coast.m4a'), sha256=b'\\x95\\xc3\\xe0:\\x8d#\\x1c\\x8b\\x06\\xc4\\x0e\\xbfp\\xd4\\r\\xd1_Z\\xde\\x1f\\xf5\\xaf1\\xd0Z\\xe0i\\xa3\\x04\\x1f\\xc8\\x83', title='Carolina Coast', release_id=2, duration=302, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}], track_number='9', disc_number='1')"),
    GenericRepr("T(id=10, filepath=PosixPath('/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/10. Going to Georgia.m4a'), sha256=b'\\x03\\xdb>|\\xc9H\\x7fGm\\x84\\xac\\xec`\\xf5/\\xe8\\xf4\\xf7\\xd2\\xbf\\x97Bh\\x14\\xd0\\x83:\\xe2\\x9b5(\\x17', title='Going to Georgia', release_id=2, duration=153, artists=[{'artist': T(id=2, name='Aaron West and the Roaring Twenties', favorite=False, num_releases=None), 'role': <ArtistRoles.MAIN: 1>}, {'artist': T(id=3, name='John Darnielle', favorite=False, num_releases=None), 'role': <ArtistRoles.COMPOSER: 5>}], track_number='10', disc_number='1')")
]
