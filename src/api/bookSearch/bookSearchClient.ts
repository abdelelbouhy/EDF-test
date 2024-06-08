import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {
  BookParseResponse,
  ConstructorParams,
  BookResponse,
  BookValue
} from './bookSearchClient.interfaces';

// type Dictionary = {
//   [key: string]: unknown;
// }

export class BookSearchClient {
  constructor(
    private baseUrl: string,
    private authorName: string,
    private params: ConstructorParams,
    private createFullPathKeyName: boolean
  ) {}

  private buildUrl = (): string => {
    let url = `${this.baseUrl}${this.authorName}`;
    Object.keys(this.params).forEach(
      (key) => (url += `&${key}=${this.params[key as keyof ConstructorParams]}`)
    );

    return url;
  };

  private flattenBookResponse = (
    currentObject: BookResponse[] | BookParseResponse,
    newObject: BookValue | {},
    createFullPathKeyName: boolean,
    keyName = ''
  ) => {
    for (let key in currentObject) {
      let value = currentObject[key as keyof BookValue];

      if (typeof value !== 'object') {
        if (!createFullPathKeyName) {
          newObject[key as keyof BookValue] = value;
        } else {
          if (keyName === '') {
            newObject[key as keyof BookValue] = value;
          } else {
            if (key === '') {
              newObject[keyName as keyof BookValue] = value;
            } else {
              newObject[(keyName + '.' + key) as keyof BookValue] = value;
            }
          }
        }
      } else {
        if (!createFullPathKeyName) {
          this.flattenBookResponse(value, newObject, createFullPathKeyName, key);
        } else {
          if (keyName === '' || keyName) {
            this.flattenBookResponse(value, newObject, createFullPathKeyName, key);
          } else {
            this.flattenBookResponse(
              value,
              newObject,
              createFullPathKeyName,
              keyName + '.' + key
            );
          }
        }
      }
    }
  };

  private parseJson = (data: string): BookParseResponse[] => {
    var json = JSON.parse(data);

    return json.map((item: BookParseResponse) => {
      const newObject = {};

      this.flattenBookResponse(item, newObject, this.createFullPathKeyName);

      return newObject;
    });
  };

  private parseXml = async (data: string) => {
    const xmlDoc = await parseStringPromise(data);
    const books: any = Object.values(Object.values(xmlDoc)[0] as any)[0];

    return books.map((book: any) => {
      const result: any = {};
      for (let key in book) {
        result[key] = book[key][0];
      }

      return result;
    });
  };

  public getBooksByAuthor = async (): Promise<BookParseResponse[] | null | Error> => {
    const url = this.buildUrl();

    try {
      const { data } = await axios.get(url);

      if (data) {
        if (this.params.format === 'json') {
          return this.parseJson(data);
        } else if (this.params.format === 'xml') {
          return this.parseXml(data);
        }
      }

      return null;
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }
  };
}
