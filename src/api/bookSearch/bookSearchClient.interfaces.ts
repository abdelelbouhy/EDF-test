export interface ConstructorParams {
  format: string;
  limit: number;
}

interface BookDetails {
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
}

interface Stock {
  bookQuantity: number;
  bookPrice: number;
}

export interface BookResponse {
  book: BookDetails;
  stock: Stock;
}

export interface BookParseResponse {
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
  bookQuantity: number;
  bookPrice: number;
}

export type BookValue = BookDetails | Stock;

export type Book = {
  [name: string]: unknown;
};
