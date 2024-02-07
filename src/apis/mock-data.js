export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'TuanKiet TrelloWeb-Project',
    slug: 'tuankiet-trello-web-project',
    description: 'Pro MERN stack Course',
    userId: 'tuankiet',
    likes: [],
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03'],
    columns: [
      {
        _id: 'column-id-01',
        userId: 'tuankiet',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            _id: 'card-id-01',
            userId: 'tuankiet',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Description of card 01',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-01'],
            favorites: ['test comment 01', 'test comment 02'],
            downloads: 3
          },
          { _id: 'card-id-02', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-03', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-04', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-05', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-06', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-07', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, likes: [], favorites: [], downloads: 0 }
        ]
      },
      {
        _id: 'column-id-02',
        userId: 'tuankiet',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          { _id: 'card-id-08', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 08', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-09', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 09', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-10', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 10', description: null, cover: null, likes: [], favorites: [], downloads: 0 }
        ]
      },
      {
        _id: 'column-id-03',
        userId: 'tuankiet',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          { _id: 'card-id-11', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 11', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-12', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 12', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-13', userId: 'tuankiet', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 13', description: null, cover: null, likes: [], favorites: [], downloads: 0 }
        ]
      }
    ]
  }
}