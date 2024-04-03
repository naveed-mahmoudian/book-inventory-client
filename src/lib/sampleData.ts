import { TBook } from '@/types/data';

export const sampleBookData: TBook[] = [
  {
    id: '1',
    title: 'First Book',
    authors: [
      {
        id: '1',
        firstName: 'Author1First',
        lastName: 'Author1Last',
      },
    ],
    genre: 'Mystery',
    pages: 100,
    quantity: 1,
  },
  {
    id: '2',
    title: 'Second Book',
    authors: [
      {
        id: '2',
        firstName: 'Author2First',
        lastName: 'Author2Last',
      },
    ],
    genre: 'Sci-Fi',
    pages: 200,
    quantity: 2,
  },
  {
    id: '3',
    title: 'Third Book',
    authors: [
      {
        id: '3',
        firstName: 'Author3First',
        lastName: 'Author3Last',
      },
      {
        id: '2',
        firstName: 'Author2First',
        lastName: 'Author2Last',
      },
    ],
    genre: 'Thriller',
    pages: 300,
    quantity: 3,
  },
];
