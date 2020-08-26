export const mockReleases = [
  {
    addedOn: 1597090380,
    artists: [{ id: 2, name: 'IZ*ONE (아이즈원)' }],
    collections: [
      { id: 3, name: 'K-Pop', type: 4 },
      { id: 4, name: 'Death Metal', type: 4 },
      { id: 5, name: 'bubbly', type: 2 },
      { id: 1, name: 'Inbox', type: 1 },
    ],
    id: 2,
    releaseType: 'Album',
    title: 'BLOOM*IZ',
    tracks: {
      1: {
        1: {
          artists: [
            { id: 2, name: 'IZ*ONE (아이즈원)', role: 1 },
            { id: 3, name: 'Justin Bieber', role: 2 },
          ],
          length: 100,
          title: 'EYES',
        },
        2: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'FIESTA',
        },
        3: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'DREAMLIKE',
        },
        4: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'AYAYAYA',
        },
        5: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'SO CURIOUS',
        },
        6: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'SPACESHIP',
        },
        7: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: '우연이 아니야',
        },
      },
      2: {
        1: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'YOU & I',
        },
        2: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'DAYDREAM',
        },
        3: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'PINK BLUSHER',
        },
        4: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: '언젠가 우리의 밤도 지나가겠죠',
        },
        5: {
          artists: [{ id: 2, name: 'IZ*ONE (아이즈원)', role: 1 }],
          length: 100,
          title: 'OPEN YOUR EYES',
        },
      },
    },
    year: 2020,
  },
  {
    addedOn: 1592090380,
    artists: [
      { id: 3, name: 'Justin Bieber' },
      { id: 4, name: '6ix9ine' },
      { id: 5, name: '7even10en' },
      { id: 6, name: '8ight11leven' },
      { id: 7, name: '9ine12welve' },
      { id: 8, name: '10en13hirteen' },
      { id: 9, name: '11leven14ourteen' },
      { id: 10, name: '12welve15ifteen' },
    ],
    collections: [
      { id: 6, name: 'Ear Rape', type: 4 },
      { id: 4, name: 'Death Metal', type: 4 },
      { id: 60, name: 'Pop', type: 4 },
      { id: 61, name: 'Hop-Hip', type: 4 },
      { id: 62, name: 'Rap', type: 4 },
      { id: 63, name: 'Trashbag Filler', type: 4 },
      { id: 7, name: 'Music to Shoot Yourself To', type: 2 },
      { id: 8, name: 'One cannot wait for the future', type: 2 },
      { id: 9, name: 'Reasons for a Nuclear War', type: 2 },
      { id: 9, name: 'Why I Stopped Listening to Music', type: 2 },
      { id: 9, name: 'Lullabies for Young Overachievers', type: 2 },
      { id: 28, name: 'Do Not Pass Go Records', type: 3 },
    ],
    id: 3,
    releaseType: 'Single',
    title: 'Baby (6ix9ine Remix)',
    tracks: {
      1: {
        1: {
          artists: [
            { id: 3, name: 'Justin Bieber', role: 1 },
            { id: 4, name: '6ix9ine', role: 3 },
            { id: 5, name: '7even10en', role: 3 },
            { id: 6, name: '8ight11leven', role: 3 },
            { id: 7, name: '9ine12welve', role: 3 },
            { id: 8, name: '10en13hirteen', role: 3 },
            { id: 9, name: '11leven14ourteen', role: 3 },
            { id: 10, name: '12welve15ifteen', role: 3 },
          ],
          length: 100,
          title: 'Baby (6ix9ine Remix)',
        },
      },
    },
    year: 2012,
  },
];

export const mockCollections = [
  {
    favorite: false,
    id: 1,
    lastUpdatedOn: 10000,
    name: 'Inbox',
    numReleases: 90,
    topGenres: [
      { id: 3, name: 'K-Pop' },
      { id: 4, name: 'Death Metal' },
      { id: 10, name: 'IDM' },
      { id: 11, name: 'Pop' },
      { id: 12, name: 'Not Seen Live' },
    ],
    type: 1,
  },
  {
    favorite: true,
    id: 2,
    lastUpdatedOn: 100000,
    name: 'Belly Rubbing Tunes',
    numReleases: 47,
    topGenres: [
      { id: 13, name: 'Bongos' },
      { id: 14, name: 'Beats' },
      { id: 15, name: 'Mmmm' },
      { id: 16, name: 'Rubs' },
      { id: 17, name: 'Seen Live' },
    ],
    type: 2,
  },
  {
    favorite: false,
    id: 3,
    lastUpdatedOn: 1000000,
    name: 'Music To Shoot Yourself To',
    numReleases: 2,
    topGenres: [
      { id: 18, name: 'Shit' },
      { id: 19, name: 'Seen Live' },
      { id: 20, name: 'JavaScript' },
      { id: 21, name: 'Duck Typing' },
      { id: 22, name: 'Computers' },
    ],
    type: 2,
  },
  {
    favorite: true,
    id: 4,
    lastUpdatedOn: 10000000,
    name: 'Seen "Live"',
    numReleases: 17,
    topGenres: [
      { id: 17, name: 'Seen Live' },
      { id: 20, name: 'JavaScript' },
      { id: 13, name: 'Bongos' },
      { id: 21, name: 'Duck Typing' },
      { id: 22, name: 'Computers' },
    ],
    type: 4,
  },
  {
    favorite: true,
    id: 5,
    lastUpdatedOn: 10000000,
    name: 'Vivrant',
    numReleases: 31,
    topGenres: [
      { id: 23, name: 'Progressive House' },
      { id: 24, name: 'Tech-House' },
      { id: 25, name: 'House' },
      { id: 26, name: 'Techno' },
      { id: 27, name: 'Deep House' },
    ],
    type: 3,
  },
];

export const mockArtists = [
  {
    favorite: false,
    id: 1,
    name: 'Red Fox',
    numReleases: 5,
    topGenres: [
      { id: 3, name: 'K-Pop' },
      { id: 4, name: 'Death Metal' },
      { id: 10, name: 'IDM' },
      { id: 11, name: 'Pop' },
      { id: 12, name: 'Not Seen Live' },
    ],
  },
  {
    favorite: true,
    id: 2,
    name: 'Belly Rubber Group',
    numReleases: 9,
    topGenres: [
      { id: 13, name: 'Bongos' },
      { id: 14, name: 'Beats' },
      { id: 15, name: 'Mmmm' },
      { id: 16, name: 'Rubs' },
      { id: 17, name: 'Seen Live' },
    ],
  },
  {
    favorite: false,
    id: 3,
    name: 'My Yellow Cauliflower',
    numReleases: 2,
    topGenres: [
      { id: 18, name: 'Shit' },
      { id: 19, name: 'Seen Live' },
      { id: 20, name: 'JavaScript' },
      { id: 21, name: 'Duck Typing' },
      { id: 22, name: 'Computers' },
    ],
  },
  {
    favorite: true,
    id: 4,
    name: 'toot toot',
    numReleases: 17,
    topGenres: [
      { id: 17, name: 'Seen Live' },
      { id: 20, name: 'JavaScript' },
      { id: 13, name: 'Bongos' },
      { id: 21, name: 'Duck Typing' },
      { id: 22, name: 'Computers' },
    ],
  },
  {
    favorite: true,
    id: 5,
    name: 'Jeremy Olander',
    numReleases: 31,
    topGenres: [
      { id: 23, name: 'Progressive House' },
      { id: 24, name: 'Tech-House' },
      { id: 25, name: 'House' },
      { id: 26, name: 'Techno' },
      { id: 27, name: 'Deep House' },
    ],
  },
];

export const mockQueries = [
  {
    addedOn: 10000000,
    id: 1,
    name: 'Shitty Inbox Music',
    query: 'system:"inbox" collage:"Music To Shoot Yourself To"',
  },
  {
    addedOn: 10000001,
    id: 2,
    name: 'Shitty Vivrant Music',
    query: 'label:"Vivrant" collage:"Music To Shoot Yourself To"',
  },
  {
    addedOn: 100000010,
    id: 3,
    name: 'A Really Really Really Goddamn Long Saved Query Name',
    query:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
];
