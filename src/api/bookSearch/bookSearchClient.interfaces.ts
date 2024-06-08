export interface ConstructorParams {
  format: string | undefined;
  limit: number;
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
