import axios from 'axios';
import {
  BookSearchClient,
  jsonTestData,
  joindKeysResult,
  xmlTestData,
  xmlResult,
  nestedXmlTestData,
  nestedXmlResult,
  shakespearResult,
  nestedXmlJoindResult
} from '..';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookSearchClient ', () => {
  describe('XML', () => {
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

    it('should return correct list of book ojects with correct properties list from xml string', async () => {
      const result = await book.getBooksByAuthor();

      expect(result).toEqual(xmlResult);
    });
  });

  describe('Nested XML', () => {
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

    it('should return correct list of book ojects with correct properties list from nested xml string', async () => {
      const result = await book.getBooksByAuthor();

      expect(result).toEqual(nestedXmlResult);
    });
  });

  describe('JSON', () => {
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

    it('should return correct list of book ojects with correct properties list from json string', async () => {
      const result = await book.getBooksByAuthor();

      expect(result).toEqual(shakespearResult);
    });
  });

  describe('JSON to returns joind key names', () => {
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
        true,
        '.'
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return correct list of book ojects with correct properties list', async () => {
      const result = await book.getBooksByAuthor();

      expect(result).toEqual(joindKeysResult);
    });
  });

  describe('Joind keys names for nested XL', () => {
    let book: BookSearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: nestedXmlTestData });
      book = new BookSearchClient(
        'http://safari.online.books.com/author?author=',
        'Ben',
        {
          limit: 100,
          format: 'xml'
        },
        true,
        '.'
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return correct list of book ojects with correct properties list wnd nested key names', async () => {
      const result = await book.getBooksByAuthor();

      expect(result).toEqual(nestedXmlJoindResult);
    });
  });

  describe('Fetching data throw an error', () => {
    let book: BookSearchClient;
    const errorMessage = 'An error has occured';

    beforeAll(() => {
      book = new BookSearchClient(
        'http://safari.online.books.com/author?author=',
        'Ben',
        {
          limit: 100,
          format: 'xml'
        },
        true,
        '.'
      );

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error message', async () => {
      const result = book.getBooksByAuthor();

      await expect(result).rejects.toThrow(errorMessage);
    });
  });
});
