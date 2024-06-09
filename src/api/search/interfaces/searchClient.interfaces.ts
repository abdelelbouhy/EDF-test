export interface ConstructorParams {
  [name: string]: string | number;
}

export interface Response {
  [name: string]: any;
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

export interface BookValue extends BookDetails, Stock {}
