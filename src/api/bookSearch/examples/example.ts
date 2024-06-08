import { BookSearchClient } from '../bookSearchClient';

export const getBooksByAuthor = async (
  author: string,
  joinKeyNames: boolean = false
): Promise<void> => {
  const book = new BookSearchClient(
    'http://localhost:3000/by-author?author=',
    author,
    {
      limit: 10,
      format: 'json'
    },
    joinKeyNames,
    joinKeyNames ? '.' : ''
  );

  console.log(await book.getBooksByAuthor());
};

export const getBooksXml = async () => {
  const book = new BookSearchClient(
    'http://localhost:3000/get-xml?author=',
    'Shakespear',
    {
      limit: 10,
      format: 'xml'
    },
    false
  );

  console.log(await book.getBooksByAuthor());
};

/* 
    to test these functions run npx ts-node src/server.ts at root dirctory
    then run npx ts-node src/examples/example.ts
    or run ./run.sh that will install npms, runs tests and runs the server
    that will call the example file funtions
*/

export const runExamples = () => {
  getBooksByAuthor('Shakespear', true);
  getBooksByAuthor('Shakespear');
  getBooksByAuthor('Ben');
  getBooksXml();
};
