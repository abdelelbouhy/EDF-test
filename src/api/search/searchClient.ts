import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { ConstructorParams, Response } from '.';

export class SearchClient {
  constructor(
    private baseUrl: string,
    private getBy: string,
    private params: ConstructorParams,
    private joinKeyNames: boolean,
    private separator?: string
  ) {}

  private buildUrl = (): string => {
    let url = `${this.baseUrl}${this.getBy}`;
    Object.keys(this.params).forEach(
      (key) => (url += `&${key}=${this.params[key as keyof ConstructorParams]}`)
    );

    return url;
  };

  private joinKeys = (
    tempObject: Response,
    value: Response,
    key: Response | string,
    keyName = ''
  ) => {
    const tempValue = parseFloat(value as any);
    if (keyName === '') {
      tempObject[key as keyof Response] = isNaN(tempValue) ? value : tempValue;
    } else {
      tempObject[(keyName + this.separator + key) as keyof Response] = isNaN(
        tempValue
      )
        ? value
        : tempValue;
    }
  };

  private flattenJsonResponse = (
    currentObject: Response,
    tempObject: Response,
    keyName = ''
  ) => {
    for (let key in currentObject) {
      let value: Response = currentObject[key as keyof Response];

      if (value?.constructor !== Object) {
        if (!this.joinKeyNames) {
          tempObject[key as keyof Response] = value;
        } else {
          this.joinKeys(tempObject, value, key, keyName);
        }
      } else {
        if (!this.joinKeyNames) {
          this.flattenJsonResponse(value, tempObject, key);
        } else {
          if (keyName === '') {
            this.flattenJsonResponse(value, tempObject, key);
          } else {
            this.flattenJsonResponse(
              value,
              tempObject,
              keyName + this.separator + key
            );
          }
        }
      }
    }
  };

  private parseJson = (data: string): Response[] => {
    var json = JSON.parse(data);

    return json.map((item: Response) => {
      const tempObject = {};

      this.flattenJsonResponse(item, tempObject);

      return tempObject;
    });
  };

  private flattenXmlResponse = (
    response: Response,
    tempObject: Response,
    parent: string,
    keyName = ''
  ) => {
    for (let key in response) {
      let value = response[key][0];
      if (value?.constructor !== Object) {
        const tempValue = parseFloat(value);
        if (!this.joinKeyNames) {
          tempObject[key as keyof Response] = isNaN(tempValue) ? value : tempValue;
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
    const response: Response[] = Object.values(
      Object.values(xmlDoc)[0] as keyof Response
    )[0];
    const parent = Object.keys(Object.values(xmlDoc)[0] as Response)[0];

    return response.map((res: Response) => {
      const tempObject = {};
      this.flattenXmlResponse(res, tempObject, parent);

      return tempObject;
    });
  };

  public fetch = async (): Promise<Response[] | null | Error> => {
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
