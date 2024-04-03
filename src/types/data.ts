export interface TBook {
  id: string;
  title: string;
  authors: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  genre: string;
  pages: number;
  quantity: number;
}

export interface TAuthor {
  id: string;
  firstName: string;
  lastName: string;
  bookIds: string[];
}

export interface TBookData {
  title: string;
  authors: {
    firstName: string;
    lastName: string;
  }[];
  genre: string;
  pages: number;
  quantity: number;
}
