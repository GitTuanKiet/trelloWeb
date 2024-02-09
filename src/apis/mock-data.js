export const mockData = {
  board: {
    _id: 'default',
    title: 'TuanKiet TrelloWeb-Project',
    slug: 'tuankiet-trello-web-project',
    description: 'MERN stack',
    userId: '65be12eaad430f89c2a0ed90',
    members: [
      {
        _id: '65be12eaad430f89c2a0ed90',
        firstName: 'Tuan',
        lastName: 'Kiet',
        email: 'test@gmail.com',
        avatar: '\\uploads\\avatar_1707320229886_t.jpg'
      }
    ],
    columnOrderIds: ['intro-column', 'font-end-column', 'back-end-column', 'library-column', 'column-id-01'],
    columns: [
      {
        _id: 'intro-column',
        userId: 'tuankiet',
        boardId: 'default',
        title: 'Intro',
        description: 'Description of intro column',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03'],
        cards: [
          {
            _id: 'card-id-01',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'intro-column',
            title: 'Welcome to TuanKiet TrelloWeb-Project',
            description: 'This is a MERN stack web project showcasing the use of DND-Kit, JWT, Redux, React-Vite, and Material-UI. Explore the features and functionalities!',
            cover: '',
            likes: ['test-user-id-01'],
            favorites: ['Great project!', 'Excited to see more!'],
            downloads: 5
          },
          {
            _id: 'card-id-02',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'intro-column',
            title: 'About the Project',
            description: 'Create, manage, and organize your tasks and projects with TuanKiet TrelloWeb-Project. Explore the features and functionalities!',
            cover: '',
            likes: ['test-user-id-02'],
            favorites: ['Interesting project!', 'Looking forward to the details!'],
            downloads: 7
          },
          {
            _id: 'card-id-03',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'intro-column',
            title: 'Get Started',
            description: 'Get started with TuanKiet TrelloWeb-Project. Explore the features and functionalities!',
            cover: '',
            likes: ['test-user-id-03'],
            favorites: ['Excited to get involved!', 'Let\'s get started!'],
            downloads: 3
          }
        ]
      },
      {
        _id: 'font-end-column',
        userId: 'tuankiet',
        boardId: 'default',
        title: 'Front-End',
        description: 'Description of front-end column',
        cardOrderIds: ['card-id-04', 'card-id-05', 'card-id-06'],
        cards: [
          {
            _id: 'card-id-04',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'font-end-column',
            title: 'React',
            description: 'Description of React card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-01'],
            favorites: ['test comment 01', 'test comment 02'],
            downloads: 3
          },
          {
            _id: 'card-id-05',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'font-end-column',
            title: 'Redux',
            description: 'Description of Redux card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-02'],
            favorites: ['test comment 03', 'test comment 04'],
            downloads: 7
          },
          {
            _id: 'card-id-06',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'font-end-column',
            title: 'Vite',
            description: 'Description of Vite card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-03'],
            favorites: ['test comment 05', 'test comment 06'],
            downloads: 5
          }
        ]
      },
      {
        _id: 'back-end-column',
        userId: 'tuankiet',
        boardId: 'default',
        title: 'Back-End',
        description: 'Description of back-end column',
        cardOrderIds: ['card-id-07', 'card-id-08', 'card-id-09'],
        cards: [
          {
            _id: 'card-id-07',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'back-end-column',
            title: 'Node.js',
            description: 'Description of Node.js card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-01'],
            favorites: ['test comment 01', 'test comment 02'],
            downloads: 3
          },
          {
            _id: 'card-id-08',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'back-end-column',
            title: 'Express.js',
            description: 'Description of Express.js card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-02'],
            favorites: ['test comment 03', 'test comment 04'],
            downloads: 7
          },
          {
            _id: 'card-id-09',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'back-end-column',
            title: 'MongoDB',
            description: 'Description of MongoDB card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-03'],
            favorites: ['test comment 05', 'test comment 06'],
            downloads: 5
          }
        ]
      },
      {
        _id: 'library-column',
        userId: 'tuankiet',
        boardId: 'default',
        title: 'Library',
        description: 'Description of library column',
        cardOrderIds: ['card-id-010', 'card-id-012', 'card-id-013'],
        cards: [
          {
            _id: 'card-id-010',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'library-column',
            title: 'Material-UI',
            description: 'Description of Material-UI card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-01'],
            favorites: ['test comment 01', 'test comment 02'],
            downloads: 3
          },
          {
            _id: 'card-id-012',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'library-column',
            title: 'DND-Kit',
            description: 'Description of DND-Kit card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-03'],
            favorites: ['test comment 05', 'test comment 06'],
            downloads: 5
          },
          {
            _id: 'card-id-013',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'library-column',
            title: 'JWT',
            description: 'Description of JWT card',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-04'],
            favorites: ['test comment 07', 'test comment 08'],
            downloads: 3
          }
        ]
      },
      {
        _id: 'column-id-01',
        userId: 'tuankiet',
        boardId: 'default',
        title: 'To Do Column 01',
        description: 'Description of column 01',
        cardOrderIds: ['card-id-0111', 'card-id-0211', 'card-id-0311', 'card-id-0411', 'card-id-0511', 'card-id-0611', 'card-id-0711'],
        cards: [
          {
            _id: 'card-id-0111',
            userId: 'tuankiet',
            boardId: 'default',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Description of card 01',
            cover: '\\uploads\\cover_1707278742004_trello-ar21.svg',
            likes: ['test-user-id-01'],
            favorites: ['test comment 01', 'test comment 02'],
            downloads: 3
          },
          { _id: 'card-id-0211', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-0311', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-0411', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-0511', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-0611', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, likes: [], favorites: [], downloads: 0 },
          { _id: 'card-id-0711', userId: 'tuankiet', boardId: 'default', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, likes: [], favorites: [], downloads: 0 }
        ]
      }
    ]
  }
}