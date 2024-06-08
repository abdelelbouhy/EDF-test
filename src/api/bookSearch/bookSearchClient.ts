import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { ConstructorParams, Book } from './bookSearchClient.interfaces';

export class BookSearchClient {
  constructor(
    private baseUrl: string,
    private authorName: string,
    private params: ConstructorParams,
    private joinKeyNames: boolean
  ) {}

  private buildUrl = (): string => {
    let url = `${this.baseUrl}${this.authorName}`;
    Object.keys(this.params).forEach(
      (key) => (url += `&${key}=${this.params[key as keyof ConstructorParams]}`)
    );

    return url;
  };

  private flattenBookResponse = (
    currentObject: any,
    tempObject: Book,
    joinKeyNames: boolean,
    keyName = ''
  ) => {
    for (let key in currentObject) {
      let value = currentObject[key as keyof Book];

      if (value?.constructor !== Object) {
        if (!joinKeyNames) {
          tempObject[key as keyof Book] = value;
        } else {
          if (keyName === '') {
            tempObject[key as keyof Book] = value;
          } else {
            if (key === '') {
              tempObject[keyName as keyof Book] = value;
            } else {
              tempObject[(keyName + '.' + key) as keyof Book] = value;
            }
          }
        }
      } else {
        if (!joinKeyNames) {
          this.flattenBookResponse(value, tempObject, joinKeyNames, key);
        } else {
          if (keyName === '') {
            this.flattenBookResponse(value, tempObject, joinKeyNames, key);
          } else {
            this.flattenBookResponse(
              value,
              tempObject,
              joinKeyNames,
              keyName + '.' + key
            );
          }
        }
      }
    }
  };

  private parseJson = (data: string): Book[] => {
    var json = JSON.parse(data);

    return json.map((item: Book) => {
      const tempObject = {};

      this.flattenBookResponse(item, tempObject, this.joinKeyNames);

      return tempObject;
    });
  };

  private flattenXmlResponse = (book: any, tempObject: Book) => {
    for (let key in book) {
      let value = book[key][0];
      if (value?.constructor !== Object) {
        const tempValue = parseFloat(value)
        tempObject[key as keyof Book] = isNaN(tempValue) ? value: tempValue;
      } else {
        this.flattenXmlResponse(value, tempObject);
      }
    }
  };

  private parseXml = async (data: string) => {
    const xmlDoc = await parseStringPromise(data);
    const books: Book[] = Object.values(Object.values(xmlDoc)[0] as keyof Book)[0];

    return books.map((book: Book) => {
      const tempObject = {};
      this.flattenXmlResponse(book, tempObject);

      return tempObject;
    });
  };

  public getBooksByAuthor = async (): Promise<Book[] | null | Error> => {
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
