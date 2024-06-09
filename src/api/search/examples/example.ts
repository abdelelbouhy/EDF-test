import { SearchClient } from '../searchClient';
import { Response } from '../interfaces';

export const fetch = async (
  getBy: string,
  value: string,
  joinKeyNames: boolean = false
): Promise<Error | Response[] | null> => {
  const book = new SearchClient(
    `http://localhost:3000/${getBy}`,
    value,
    {
      limit: 10,
      format: 'json'
    },
    joinKeyNames,
    joinKeyNames ? '.' : ''
  );

  return book.fetch();
};

export const fetchXml = async (
  getBy: string,
  value: string,
  joinKeyNames: boolean = false
) => {
  const book = new SearchClient(
    `http://localhost:3000/get-xml?${getBy}`,
    value,
    {
      limit: 10,
      format: 'xml'
    },
    joinKeyNames
  );

  return book.fetch();
};

/* 
    to test these functions run npx ts-node src/server.ts at root dirctory
    then run npx ts-node src/examples/example.ts
    or run ./run.sh that will install npms, runs tests and runs the server
    that will call the example file funtions
*/

export const runExamples = async () => {
  // get by author
  console.log(await fetch('get-by/author?value=', 'Shakespear', true));
  // get by publisher
  console.log(await fetch('get-by/publisher?value=', 'Ben'));
  // getXml
  console.log(await fetchXml('author', 'Shakespear'));
};
