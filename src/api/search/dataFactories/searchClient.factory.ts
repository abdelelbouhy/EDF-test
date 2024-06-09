import { Response, BookParseResponse, BookResponse } from '..';

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

const resultJoinedDataFactory = (author: string): any => {
  return Array(2)
    .fill(null)
    .map((_elm, idx) => ({
      'book.bookTitle': `bookTitle_${idx + 1}`,
      'book.bookAuthor': author,
      'book.isbn': `isbn_${idx + 1}`,
      'stock.bookQuantity': (idx + 1) * 10,
      'stock.bookPrice': (idx + 1) * 20
    }));
};

export const jsonTestData: Response = {
  author: {
    shakespear: JSON.stringify(testDataFactory('shakespear')),
    ben: JSON.stringify(testDataFactory('Ben'))
  },
  publisher: {
    shakespear: JSON.stringify(testDataFactory('shakespear')),
    ben: JSON.stringify(testDataFactory('Ben'))
  }
};

export const shakespearResult = resultDataFactory('shakespear');

export const joindKeysResult = resultJoinedDataFactory('shakespear');

export const nestedXmlJoindResult = resultJoinedDataFactory('Ben').map(
  (obj: any, index: number) => {
    const idx = 0;
    const count = idx + 1;
    delete obj['stock.bookPrice'];
    delete obj['stock.bookQuantity'];

    return {
      ...obj,
      'book.bookPrice': (index + 1) * 20,
      'book.bookQuantity': (index + 1) * 10,
      [`book.nest.level_${count}`]: `level_${count}`,
      [`book.nest.level_${count + 1}`]: `level_${count + 1}`
    };
  }
);

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
export const nestedXmlResult = resultDataFactory('Ben').map((obj, index) => {
  const idx = 0;
  const count = idx + 1;

  return {
    ...obj,
    [`level_${count}`]: `level_${count}`,
    [`level_${count + 1}`]: `level_${count + 1}`
  };
});
