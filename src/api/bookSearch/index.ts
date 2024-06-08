import {
  BookParseResponse,
  BookResponse,
  BookValue
} from './bookSearchClient.interfaces';

export * from './bookSearchClient';
export * from './bookSearchClient.interfaces';
export * from './test.data';

const testObj = JSON.stringify([
  {
    book: {
      title: 'title',
      author: 'author',
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
      author: 'author_2',
      isbn: 'isbn_2'
    },
    stock: {
      quantity: 100,
      price: 202.1
    }
  }
]);

const flattenBookResponse = (
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
        flattenBookResponse(value, newObject, createFullPathKeyName, key);
      } else {
        if (keyName === '' || keyName) {
          flattenBookResponse(value, newObject, createFullPathKeyName, key);
        } else {
          flattenBookResponse(
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

const parseJson = (
  data: string,
  createFullPathKeyName: boolean
): BookParseResponse[] => {
  var json = JSON.parse(data);

  return json.map((item: BookParseResponse) => {
    const newObject = {};

    flattenBookResponse(item, newObject, createFullPathKeyName);

    return newObject;
  });
};

const test = parseJson(testObj, false);

// console.log(test);
