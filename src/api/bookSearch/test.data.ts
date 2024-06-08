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

export const jsonResult = [
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

export const jsonResultFullKeyNames = [
  {
    'book.title': 'title',
    'book.author': 'Ben',
    'book.isbn': 'isbn',
    'stock.quantity': 10,
    'stock.price': 20.1
  },
  {
    'book.title': 'title_2',
    'book.author': 'Ben',
    'book.isbn': 'isbn_2',
    'stock.quantity': 100,
    'stock.price': 202.1
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

export const jsonNewSellerResult = [
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

export const xmlTestData = {
  data: `<?xml version="1.0" encoding="UTF-8"?>
            <books>
                <book>
                    <title>Title_xml</title>
                    <isbn>isbn</isbn>
                    <author>Ben</author>
                    <quantity>50</quantity>
                    <price>20.50</price>
                </book>
                <book>
                    <title>Title_2</title>
                    <isbn>isbn_2</isbn>
                    <author>Ben</author>
                    <quantity>100</quantity>
                    <price>200.50</price>
                </book>
            </books>
`
};

export const xmlResult = [
  {
    title: 'Title_xml',
    isbn: 'isbn',
    author: 'Ben',
    quantity: '50',
    price: '20.50'
  },
  {
    title: 'Title_2',
    isbn: 'isbn_2',
    author: 'Ben',
    quantity: '100',
    price: '200.50'
  }
];
