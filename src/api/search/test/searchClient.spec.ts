import axios from 'axios';
import {
  SearchClient,
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

describe('SearchClient ', () => {
  describe('XML', () => {
    let book: SearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: xmlTestData });
      book = new SearchClient(
        'http://api.book-seller-example.com/get-by/author?value=',
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
        'http://api.book-seller-example.com/get-by/author?value=Shakespear&limit=10&format=xml';
      const getSpy = jest.spyOn(mockedAxios, 'get');
      book.fetch();

      expect(getSpy).toHaveBeenCalledWith(url);
    });

    it('should return correct numbers of calls', () => {
      const getSpy = jest.spyOn(mockedAxios, 'get');
      book.fetch();

      expect(getSpy).toHaveBeenCalledTimes(1);
    });

    it('should return correct list of book ojects with correct properties list from xml string', async () => {
      const result = await book.fetch();

      expect(result).toEqual(xmlResult);
    });
  });

  describe('Nested XML', () => {
    let book: SearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: nestedXmlTestData });
      book = new SearchClient(
        'http://api.book-seller-example.com/get-by/author?value=',
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
      const result = await book.fetch();

      expect(result).toEqual(nestedXmlResult);
    });
  });

  describe('JSON', () => {
    let book: SearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: jsonTestData.publisher.shakespear });
      book = new SearchClient(
        'http://safari.online.books.com/get-by/publisher?value=',
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
      const result = await book.fetch();

      expect(result).toEqual(shakespearResult);
    });
  });

  describe('JSON to returns joind key names', () => {
    let book: SearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: jsonTestData.author.shakespear });
      book = new SearchClient(
        'http://safari.online.books.com/get-by/author?value=',
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
      const result = await book.fetch();

      expect(result).toEqual(joindKeysResult);
    });
  });

  describe('Joind keys names for nested XL', () => {
    let book: SearchClient;

    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: nestedXmlTestData });
      book = new SearchClient(
        'http://safari.online.books.com/get-by/publisher?value=',
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
      const result = await book.fetch();

      expect(result).toEqual(nestedXmlJoindResult);
    });
  });

  describe('Fetching data throw an error', () => {
    let book: SearchClient;
    const errorMessage = 'An error has occured';

    beforeAll(() => {
      book = new SearchClient(
        'http://safari.online.books.com/get-by/publisher?value=',
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
      const result = book.fetch();

      await expect(result).rejects.toThrow(errorMessage);
    });
  });
});
