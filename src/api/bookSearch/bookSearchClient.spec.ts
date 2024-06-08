import axios from 'axios';
import {
  BookSearchClient,
  jsonTestData,
  benResult,
  shakespearJoindKeysResult,
  xmlTestData,
  xmlResult,
  nestedXmlTestData,
  nestedXmlResult,
  shakespearResult
} from '.';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookSearchClient for api.book-seller, author Shakespear and xml format', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: xmlTestData });
    book = new BookSearchClient(
      'http://api.book-seller-example.com/by-author?author=',
      'Shakespear',
      {
        limit: 10,
        format: 'xml'
      },
      false
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://api.book-seller-example.com/by-author?author=Shakespear&limit=10&format=xml';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('should return correct numbers of calls', () => {
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('should return correct list of book ojects with correct properties list', async () => {
    const result = await book.getBooksByAuthor();

    expect(result).toEqual(xmlResult);
  });
});

describe('BookSearchClient for api.book-seller, author Shakespear and xml format (nested)', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: nestedXmlTestData });
    book = new BookSearchClient(
      'http://api.book-seller-example.com/by-author?author=',
      'Shakespear',
      {
        limit: 10,
        format: 'xml'
      },
      false
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://api.book-seller-example.com/by-author?author=Shakespear&limit=10&format=xml';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('should return correct numbers of calls', () => {
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('should return correct list of book ojects with correct properties list', async () => {
    const result = await book.getBooksByAuthor();

    expect(result).toEqual(nestedXmlResult);
  });
});

describe('BookSearchClient for safari.online.books, author Ben and json format', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: jsonTestData.shakespear });
    book = new BookSearchClient(
      'http://safari.online.books.com/author?author=',
      'Ben',
      {
        limit: 100,
        format: 'json'
      },
      false
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://safari.online.books.com/author?author=Ben&limit=100&format=json';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('should return correct list of book ojects with correct properties list', async () => {
    const result = await book.getBooksByAuthor();

    expect(result).toEqual(shakespearResult);
  });
});

describe('BookSearchClient for different.online.books, author ben and json format', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: jsonTestData.ben });
    book = new BookSearchClient(
      'http://different.online.books.com/author?author=',
      'ben',
      {
        limit: 50,
        format: 'json'
      },
      false
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://different.online.books.com/author?author=ben&limit=50&format=json';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('should return correct list of book ojects with correct properties list from new seller', async () => {
    const result = await book.getBooksByAuthor();

    expect(result).toEqual(benResult);
  });
});

describe('BookSearchClient for api.book-seller, author Shakespear and xml format', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: jsonTestData.shakespear });
    book = new BookSearchClient(
      'http://api.book-seller-example.com/by-author?author=',
      'Shakespear',
      {
        limit: 10,
        format: 'json'
      },
      false
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://api.book-seller-example.com/by-author?author=Shakespear&limit=10&format=json';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });
});

describe('BookSearchClient for safari.online.books, author Ben and json format with full path key names', () => {
  let book: BookSearchClient;

  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: jsonTestData.shakespear });
    book = new BookSearchClient(
      'http://safari.online.books.com/author?author=',
      'Ben',
      {
        limit: 100,
        format: 'json'
      },
      true
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test url is built with correct query string', () => {
    const url =
      'http://safari.online.books.com/author?author=Ben&limit=100&format=json';
    const getSpy = jest.spyOn(mockedAxios, 'get');
    book.getBooksByAuthor();

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('should return correct list of book ojects with correct properties list', async () => {
    const result = await book.getBooksByAuthor();

    expect(result).toEqual(shakespearJoindKeysResult);
  });
});
