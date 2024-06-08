export const jsonTestData = {
  data: JSON.stringify([
    {
      book: {
        title: 'title',
        author: 'Ben',
        isbn: 'isbn'
      },
      stock: {
        quantity: 10,
        price: 20.1
      }
    },
    {
      book: {
        title: 'title_2',
        author: 'Ben',
        isbn: 'isbn_2'
      },
      stock: {
        quantity: 100,
        price: 202.1
      }
    }
  ])
};

export const jsonResultData = [
  {
    title: 'title',
    author: 'Ben',
    isbn: 'isbn',
    quantity: 10,
    price: 20.1
  },
  {
    title: 'title_2',
    author: 'Ben',
    isbn: 'isbn_2',
    quantity: 100,
    price: 202.1
  }
];

export const jsonNewSellerTestData = {
  data: JSON.stringify([
    {
      book: {
        bookTitle: 'title',
        bookAuthor: 'Ben',
        isbn: 'isbn',
        releaseDate: '01/01/2010'
      },
      stock: {
        bookQuantity: 10,
        bookPrice: 20.1
      }
    },
    {
      book: {
        bookTitle: 'title_2',
        bookAuthor: 'Ben',
        isbn: 'isbn_2',
        releaseDate: '01/01/2020'
      },
      stock: {
        bookQuantity: 100,
        bookPrice: 202.1
      }
    }
  ])
};

export const jsonNewSellerResultData = [
  {
    bookTitle: 'title',
    bookAuthor: 'Ben',
    isbn: 'isbn',
    bookQuantity: 10,
    bookPrice: 20.1,
    releaseDate: '01/01/2010'
  },
  {
    bookTitle: 'title_2',
    bookAuthor: 'Ben',
    isbn: 'isbn_2',
    bookQuantity: 100,
    bookPrice: 202.1,
    releaseDate: '01/01/2020'
  }
];
