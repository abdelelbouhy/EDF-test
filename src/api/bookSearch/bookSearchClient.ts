import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { ConstructorParams, Book } from '.';

export class BookSearchClient {
  constructor(
    private baseUrl: string,
    private authorName: string,
    private params: ConstructorParams,
    private joinKeyNames: boolean,
    private separator?: string
  ) {}

  private buildUrl = (): string => {
    let url = `${this.baseUrl}${this.authorName}`;
    Object.keys(this.params).forEach(
      (key) => (url += `&${key}=${this.params[key as keyof ConstructorParams]}`)
    );

    return url;
  };

  private joinKeys = (
    tempObject: Book,
    value: Book,
    key: Book | string,
    keyName = ''
  ) => {
    const tempValue = parseFloat(value as any);
    if (keyName === '') {
      tempObject[key as keyof Book] = isNaN(tempValue) ? value : tempValue;
    } else {
      if (key === '') {
        tempObject[keyName as keyof Book] = isNaN(tempValue) ? value : tempValue;
      } else {
        tempObject[(keyName + this.separator + key) as keyof Book] = isNaN(tempValue)
          ? value
          : tempValue;
      }
    }
  };

  private flattenBookResponse = (
    currentObject: Book,
    tempObject: Book,
    keyName = ''
  ) => {
    for (let key in currentObject) {
      let value: Book = currentObject[key as keyof Book];

      if (value?.constructor !== Object) {
        if (!this.joinKeyNames) {
          tempObject[key as keyof Book] = value;
        } else {
          this.joinKeys(tempObject, value, key, keyName);
        }
      } else {
        if (!this.joinKeyNames) {
          this.flattenBookResponse(value, tempObject, key);
        } else {
          if (keyName === '') {
            this.flattenBookResponse(value, tempObject, key);
          } else {
            this.flattenBookResponse(
              value,
              tempObject,
              keyName + this.separator + key
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

      this.flattenBookResponse(item, tempObject);

      return tempObject;
    });
  };

  private flattenXmlResponse = (
    book: Book,
    tempObject: Book,
    parent: string,
    keyName = ''
  ) => {
    for (let key in book) {
      let value = book[key][0];
      if (value?.constructor !== Object) {
        const tempValue = parseFloat(value);
        if (!this.joinKeyNames) {
          tempObject[key as keyof Book] = isNaN(tempValue) ? value : tempValue;
        } else {
          this.joinKeys(tempObject, value, key, parent);
        }
      } else {
        if (!this.joinKeyNames) {
          this.flattenXmlResponse(value, tempObject, key);
        } else {
          if (keyName === '') {
            this.flattenXmlResponse(value, tempObject, parent + this.separator + key);
          } else {
            this.flattenXmlResponse(
              value,
              tempObject,
              keyName + this.separator + key
            );
          }
        }
      }
    }
  };

  private parseXml = async (data: string) => {
    const xmlDoc = await parseStringPromise(data);
    const books: Book[] = Object.values(Object.values(xmlDoc)[0] as keyof Book)[0];
    const parent = Object.keys(Object.values(xmlDoc)[0] as Book)[0];

    return books.map((book: Book) => {
      const tempObject = {};
      this.flattenXmlResponse(book, tempObject, parent);

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
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
