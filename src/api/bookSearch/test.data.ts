import { BookParseResponse, BookResponse } from '.';

const testDataFactory = (author: string): BookResponse[] => {
  return Array(2)
    .fill(null)
    .map((_elm, idx) => ({
      book: {
        bookTitle: `bookTitle_${idx + 1}`,
        bookAuthor: author,
        isbn: `isbn_${idx + 1}`
      },
      stock: {
        bookQuantity: (idx + 1) * 10,
        bookPrice: (idx + 1) * 20
      }
    }));
};

const resultDataFactory = (author: string): BookParseResponse[] => {
  return Array(2)
    .fill(null)
    .map((_elm, idx) => ({
      bookTitle: `bookTitle_${idx + 1}`,
      bookAuthor: author,
      isbn: `isbn_${idx + 1}`,
      bookQuantity: (idx + 1) * 10,
      bookPrice: (idx + 1) * 20
    }));
};

export const jsonTestData = {
  shakespear: JSON.stringify(testDataFactory('shakespear')),
  ben: JSON.stringify(testDataFactory('Ben'))
};

export const shakespearResult = resultDataFactory('shakespear');

export const shakespearJoindKeysResult = [
  {
    'book.bookAuthor': 'shakespear',
    'book.bookTitle': 'bookTitle_1',
    'book.isbn': 'isbn_1',
    'stock.bookPrice': 20,
    'stock.bookQuantity': 10
  },
  {
    'book.bookAuthor': 'shakespear',
    'book.bookTitle': 'bookTitle_2',
    'book.isbn': 'isbn_2',
    'stock.bookPrice': 40,
    'stock.bookQuantity': 20
  }
];

export const benResult = resultDataFactory('Ben');

export const xmlTestData = `<?xml version="1.0" encoding="UTF-8"?>
          <books>
            <book>
              <bookTitle>bookTitle_1</bookTitle>
              <isbn>isbn_1</isbn>
              <bookAuthor>Ben</bookAuthor>
              <bookQuantity>10</bookQuantity>
              <bookPrice>20</bookPrice>
            </book>
            <book>
              <bookTitle>bookTitle_2</bookTitle>
              <isbn>isbn_2</isbn>
              <bookAuthor>Ben</bookAuthor>
              <bookQuantity>20</bookQuantity>
              <bookPrice>40</bookPrice>
          </book>
        </books>
`;

export const xmlResult = resultDataFactory('Ben');

export const nestedXmlTestData = `<?xml version="1.0" encoding="UTF-8"?>
          <books>
            <book>
              <bookTitle>bookTitle_1</bookTitle>
              <isbn>isbn_1</isbn>
              <bookAuthor>Ben</bookAuthor>
              <bookQuantity>10</bookQuantity>
              <bookPrice>20</bookPrice>
              <nest>
                <level_1>level_1</level_1>
                <level_2>level_2</level_2>
              </nest>
            </book>
            <book>
              <bookTitle>bookTitle_2</bookTitle>
              <isbn>isbn_2</isbn>
              <bookAuthor>Ben</bookAuthor>
              <bookQuantity>20</bookQuantity>
              <bookPrice>40</bookPrice>
              <nest>
                <level_1>level_1</level_1>
                <level_2>level_2</level_2>
              </nest>
          </book>
        </books>
`;
export const nestedXmlResult = resultDataFactory('Ben').map((obj) => {
  const idx = 0;
  const count = idx + 1;

  return {
    ...obj,
    [`level_${count}`]: `level_${count}`,
    [`level_${count + 1}`]: `level_${count + 1}`
  };
});
