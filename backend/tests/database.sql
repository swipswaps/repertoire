PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

-- Insert the rows from the migrations.
INSERT INTO music__releases (id, title, release_type, added_on) VALUES (1, "Unknown Release", 12, "1970-01-01 00:00:00");
INSERT INTO music__artists (id, name) VALUES (1, "Unknown Artist");
INSERT INTO music__collections (id, name, type) VALUES
    (1, "Inbox", 1),
    (2, "Favorite", 1),
    (3, "1", 5),
    (4, "2", 5),
    (5, "3", 5),
    (6, "4", 5),
    (7, "5", 5),
    (8, "6", 5),
    (9, "7", 5),
    (10, "8", 5),
    (11, "9", 5);

INSERT INTO music__releases VALUES(2,'We Don’t Have Each Other',1,2014,'2014-07-08','/data/cover_art/fb21f22d84bb812bb8bd1988ee89c3a91f1d41e92cf988ef774423e9d85e3292.jpg','2020-10-19 00:25:34');
INSERT INTO music__releases VALUES(3,'Departure',3,2016,NULL,'/data/cover_art/d832df509b44cb7c560e2579453178016c391cd2ab8d6eab3de2bbbdf75c4ac0.jpg','2020-10-19 08:29:34');

INSERT INTO music__artists VALUES(2,'Aaron West and the Roaring Twenties',0);
INSERT INTO music__artists VALUES(3,'John Darnielle',0);
INSERT INTO music__artists VALUES(4,'Abakus',0);
INSERT INTO music__artists VALUES(5,'Bacchus',1);

INSERT INTO music__releases_artists VALUES(2,2);
INSERT INTO music__releases_artists VALUES(3,4);
INSERT INTO music__releases_artists VALUES(3,5);

INSERT INTO music__tracks VALUES(1,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/01. Our Apartment.m4a',X'75ca14432165a9ee87ee63df654ef77f45d009bbe57da0610a453c48c6b26a1a','Our Apartment',2,'1','1',213);
INSERT INTO music__tracks VALUES(2,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/02. Grapefruit.m4a',X'b85ef274639c131eb639e9843b51c0e028a870e36fb4e1d861e438d6821fae76','Grapefruit',2,'2','1',252);
INSERT INTO music__tracks VALUES(3,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/03. St. Joe Keeps Us Safe.m4a',X'9c222caec4b18819ebef4bfaf75ac319722bfa3f9660daa353732b139aab5696','St. Joe Keeps Us Safe',2,'3','1',210);
INSERT INTO music__tracks VALUES(4,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/04. Runnin’ Scared.m4a',X'9e00a1887a87e8a62b7768f736fb3006f68bb14007a742241ed725b9212150d4','Runnin’ Scared',2,'4','1',193);
INSERT INTO music__tracks VALUES(5,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/05. Divorce and the American South.m4a',X'3db45f130d836078f3baf5c9a6809a78a214c2a81f9fa77d78725d2a3fa490e0','Divorce and the American South',2,'5','1',259);
INSERT INTO music__tracks VALUES(6,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/06. The Thunderbird Inn.m4a',X'a947323036d9998347498aa3662d56013bdd020dfd9fb1038ab13fc5f939913b','The Thunderbird Inn',2,'6','1',199);
INSERT INTO music__tracks VALUES(7,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/07. Get Me Out of Here Alive.m4a',X'73542bbecd04683e584440567dae8ae20191841e3d5d0c936253228afddeab42','Get Me Out of Here Alive',2,'7','1',212);
INSERT INTO music__tracks VALUES(8,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/08. You Ain’t No Saint.m4a',X'7e95ad64266e12280b73ed33bffaa0fc30ae7aece75aa7b50b814494dbd0b111','You Ain’t No Saint',2,'8','1',265);
INSERT INTO music__tracks VALUES(9,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/09. Carolina Coast.m4a',X'95c3e03a8d231c8b06c40ebf70d40dd15f5ade1ff5af31d05ae069a3041fc883','Carolina Coast',2,'9','1',302);
INSERT INTO music__tracks VALUES(10,'/tmp/repertoire-library/Aaron West and the Roaring Twenties/2014. We Don’t Have Each Other/10. Going to Georgia.m4a',X'03db3e7cc9487f476d84acec60f52fe8f4f7d2bf97426814d0833ae29b352817','Going to Georgia',2,'10','1',153);
INSERT INTO music__tracks VALUES(11,'/tmp/repertoire-library/Abakus/2016. Departure/11. Airwaves.m4a',X'4d712872675b45e24ae1eb2806f87cdf64e02adae87782091f94961fbc623d14','Airwaves',3,'11','0',271);
INSERT INTO music__tracks VALUES(12,'/tmp/repertoire-library/Abakus/2016. Departure/04. Liberated from the Negative.m4a',X'b37ebf276db03d72a462c3152ddabbde098b6d4617a62f1297b7690d25636b6c','Liberated from the Negative',3,'4','0',304);
INSERT INTO music__tracks VALUES(13,'/tmp/repertoire-library/Abakus/2016. Departure/05. Hope.m4a',X'1ba25eb93b6ae99f664ba5387283ebda660df4f5f8ad13649199d3e76f644bb4','Hope',3,'5','0',262);
INSERT INTO music__tracks VALUES(14,'/tmp/repertoire-library/Abakus/2016. Departure/06. Dreamer.m4a',X'd2d2ef07d1def320829a4328f155834c816d49ec17ada0f4ccf0d06e2b4833c4','Dreamer',3,'6','0',412);
INSERT INTO music__tracks VALUES(15,'/tmp/repertoire-library/Abakus/2016. Departure/07. Stay with Me.m4a',X'e04b14c05cc268db85d04b41946b629a2a554f418a428ed208a5269504f00e5b','Stay with Me',3,'7','0',307);
INSERT INTO music__tracks VALUES(16,'/tmp/repertoire-library/Abakus/2016. Departure/08. Still a Soul in There.m4a',X'39c1f7b7d5cad047521527f0b4e0c913435c91d98105b4f9fc6c9abca1ef5dbc','Still a Soul in There',3,'8','0',372);
INSERT INTO music__tracks VALUES(17,'/tmp/repertoire-library/Abakus/2016. Departure/09. Lost Myself.m4a',X'd3639643d73bef8642383fdae029961b319741e3e961406818f962c95c6cb5d3','Lost Myself',3,'9','0',303);
INSERT INTO music__tracks VALUES(18,'/tmp/repertoire-library/Abakus/2016. Departure/10. The Beginning.m4a',X'bc582d8ba0eb6e4dac9ad6ae6c4d09e316f17c60bd3e81d04ac9293320853285','The Beginning',3,'10','0',382);
INSERT INTO music__tracks VALUES(19,'/tmp/repertoire-library/Abakus/2016. Departure/01. Let Go.m4a',X'9e2910b0d20491f09d1ceee783aedd5fae04009e633ab6d186112e0762e86c24','Let Go',3,'1','0',312);
INSERT INTO music__tracks VALUES(20,'/tmp/repertoire-library/Abakus/2016. Departure/02. Storm.m4a',X'081bda368a599334ac1038d8fd9658e06a1f6c35d4a27dc723d2d691970ff48a','Storm',3,'2','0',268);
INSERT INTO music__tracks VALUES(21,'/tmp/repertoire-library/Abakus/2016. Departure/03. Kite.m4a',X'f642599488e7ee9c41d0bfb87444a8daf0094c6da6dbddc915ff6d53e607e3d0','Kite',3,'3','0',320);

INSERT INTO music__tracks_artists VALUES(1,2,1);
INSERT INTO music__tracks_artists VALUES(2,2,1);
INSERT INTO music__tracks_artists VALUES(3,2,1);
INSERT INTO music__tracks_artists VALUES(4,2,1);
INSERT INTO music__tracks_artists VALUES(5,2,1);
INSERT INTO music__tracks_artists VALUES(6,2,1);
INSERT INTO music__tracks_artists VALUES(7,2,1);
INSERT INTO music__tracks_artists VALUES(8,2,1);
INSERT INTO music__tracks_artists VALUES(9,2,1);
INSERT INTO music__tracks_artists VALUES(10,2,1);
INSERT INTO music__tracks_artists VALUES(10,3,5);
INSERT INTO music__tracks_artists VALUES(11,4,1);
INSERT INTO music__tracks_artists VALUES(12,4,1);
INSERT INTO music__tracks_artists VALUES(13,4,1);
INSERT INTO music__tracks_artists VALUES(14,4,1);
INSERT INTO music__tracks_artists VALUES(15,4,1);
INSERT INTO music__tracks_artists VALUES(16,4,1);
INSERT INTO music__tracks_artists VALUES(17,4,1);
INSERT INTO music__tracks_artists VALUES(18,4,1);
INSERT INTO music__tracks_artists VALUES(19,4,1);
INSERT INTO music__tracks_artists VALUES(20,4,1);
INSERT INTO music__tracks_artists VALUES(21,4,1);

INSERT INTO music__collections VALUES(12,'Folk',0,4);
INSERT INTO music__collections VALUES(13,'Rock',0,4);
INSERT INTO music__collections VALUES(14,'Country',0,4);
INSERT INTO music__collections VALUES(15,'World',0,4);
INSERT INTO music__collections VALUES(16,'Downtempo',0,4);
INSERT INTO music__collections VALUES(17,'Electronic',0,4);
INSERT INTO music__collections VALUES(18,'House',0,4);
INSERT INTO music__collections VALUES(19,'Ambient',0,4);
INSERT INTO music__collections VALUES(20,'MyLabel',0,3);

INSERT INTO music__collections_releases VALUES(1,2,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(12,2,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(13,2,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(14,2,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(15,2,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(1,3,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(16,3,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(17,3,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(18,3,'2020-10-19 00:25:34');
INSERT INTO music__collections_releases VALUES(19,3,'2020-10-19 00:25:34');

INSERT INTO music__releases_search_index VALUES(1,1,'Release');
INSERT INTO music__releases_search_index VALUES(2,1,'Unknown');
INSERT INTO music__releases_search_index VALUES(3,2,'Carolina');
INSERT INTO music__releases_search_index VALUES(4,2,'Us');
INSERT INTO music__releases_search_index VALUES(5,2,'Thunderbird');
INSERT INTO music__releases_search_index VALUES(6,2,'Roaring');
INSERT INTO music__releases_search_index VALUES(7,2,'Divorce');
INSERT INTO music__releases_search_index VALUES(8,2,'Here');
INSERT INTO music__releases_search_index VALUES(9,2,'Me');
INSERT INTO music__releases_search_index VALUES(10,2,'Darnielle');
INSERT INTO music__releases_search_index VALUES(11,2,'Georgia');
INSERT INTO music__releases_search_index VALUES(12,2,'Aaron');
INSERT INTO music__releases_search_index VALUES(13,2,'Inn');
INSERT INTO music__releases_search_index VALUES(14,2,'St');
INSERT INTO music__releases_search_index VALUES(15,2,'Joe');
INSERT INTO music__releases_search_index VALUES(16,2,'John');
INSERT INTO music__releases_search_index VALUES(17,2,'Twenties');
INSERT INTO music__releases_search_index VALUES(18,2,'Safe');
INSERT INTO music__releases_search_index VALUES(19,2,'Saint');
INSERT INTO music__releases_search_index VALUES(20,2,'Have');
INSERT INTO music__releases_search_index VALUES(21,2,'Alive');
INSERT INTO music__releases_search_index VALUES(22,2,'Our');
INSERT INTO music__releases_search_index VALUES(23,2,'and');
INSERT INTO music__releases_search_index VALUES(24,2,'South');
INSERT INTO music__releases_search_index VALUES(25,2,'Apartment');
INSERT INTO music__releases_search_index VALUES(26,2,'Get');
INSERT INTO music__releases_search_index VALUES(27,2,'Out');
INSERT INTO music__releases_search_index VALUES(28,2,'the');
INSERT INTO music__releases_search_index VALUES(29,2,'Scared');
INSERT INTO music__releases_search_index VALUES(30,2,'Runnin');
INSERT INTO music__releases_search_index VALUES(31,2,'Keeps');
INSERT INTO music__releases_search_index VALUES(32,2,'Dont');
INSERT INTO music__releases_search_index VALUES(33,2,'to');
INSERT INTO music__releases_search_index VALUES(34,2,'Each');
INSERT INTO music__releases_search_index VALUES(35,2,'West');
INSERT INTO music__releases_search_index VALUES(36,2,'You');
INSERT INTO music__releases_search_index VALUES(37,2,'American');
INSERT INTO music__releases_search_index VALUES(38,2,'Grapefruit');
INSERT INTO music__releases_search_index VALUES(39,2,'The');
INSERT INTO music__releases_search_index VALUES(40,2,'of');
INSERT INTO music__releases_search_index VALUES(41,2,'Coast');
INSERT INTO music__releases_search_index VALUES(42,2,'No');
INSERT INTO music__releases_search_index VALUES(43,2,'We');
INSERT INTO music__releases_search_index VALUES(44,2,'Other');
INSERT INTO music__releases_search_index VALUES(45,2,'Aint');
INSERT INTO music__releases_search_index VALUES(46,2,'Going');
INSERT INTO music__releases_search_index VALUES(47,3,'with');
INSERT INTO music__releases_search_index VALUES(48,3,'Me');
INSERT INTO music__releases_search_index VALUES(49,3,'Go');
INSERT INTO music__releases_search_index VALUES(50,3,'the');
INSERT INTO music__releases_search_index VALUES(51,3,'Liberated');
INSERT INTO music__releases_search_index VALUES(52,3,'from');
INSERT INTO music__releases_search_index VALUES(53,3,'Let');
INSERT INTO music__releases_search_index VALUES(54,3,'Stay');
INSERT INTO music__releases_search_index VALUES(55,3,'Still');
INSERT INTO music__releases_search_index VALUES(56,3,'Kite');
INSERT INTO music__releases_search_index VALUES(57,3,'Departure');
INSERT INTO music__releases_search_index VALUES(58,3,'Beginning');
INSERT INTO music__releases_search_index VALUES(59,3,'Abakus');
INSERT INTO music__releases_search_index VALUES(60,3,'Negative');
INSERT INTO music__releases_search_index VALUES(61,3,'The');
INSERT INTO music__releases_search_index VALUES(62,3,'There');
INSERT INTO music__releases_search_index VALUES(63,3,'Lost');
INSERT INTO music__releases_search_index VALUES(64,3,'a');
INSERT INTO music__releases_search_index VALUES(65,3,'Hope');
INSERT INTO music__releases_search_index VALUES(66,3,'Dreamer');
INSERT INTO music__releases_search_index VALUES(67,3,'in');
INSERT INTO music__releases_search_index VALUES(68,3,'Soul');
INSERT INTO music__releases_search_index VALUES(69,3,'Airwaves');
INSERT INTO music__releases_search_index VALUES(70,3,'Myself');
INSERT INTO music__releases_search_index VALUES(71,3,'Storm');

-- admin token: 62ec24e7d70d3a55dfd823b8006ad8c6dda26aec9193efc0c83e35ce8a968bc8
INSERT INTO system__users VALUES (1, "admin", X'62ec24e7d70d3a55dfd823b8', "pbkdf2:sha256:150000$0lH2wS00$28cd8fb44dade0da081f610ade308e9528ec0b0cb7cdc697b4d20406bb201410");

-- azul token: 49efda578512015d4064b8a3f2b26898d86a48563d13960c474c60daa91ca739
INSERT INTO system__users VALUES (2, "azul", X'49efda578512015d4064b8a3', "pbkdf2:sha256:150000$k5k6W67S$3f66aefff48854f37d70b983aaf695d4094a895296177fb677c13d48444659be");

COMMIT;
