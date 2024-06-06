export interface ConstructorParams {
  format: string | undefined;
  limit: number;
  createFullPathKeyName: boolean;
}

interface Book {
  title: string;
  author: string;
  isbn: string;
}

interface Stock {
  quantity: number;
  price: number;
}

export interface BookResponse {
  book: Book;
  stock: Stock;
}

export interface BookParseResponse {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  price: number;
}

export type BookValue = Book | Stock;
