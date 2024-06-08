import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { jsonTestData, runExamples, xmlTestData } from './api/bookSearch';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

type Book = {
  shakespear: {
    data: string;
  };
  ben: {
    data: string;
  };
};

app.get('/by-author', (req, res) => {
  const {
    query: { author }
  } = req;

  const response = jsonTestData[(author as string).toLowerCase() as keyof Book];

  res.send(JSON.stringify(response));
});

app.get('/get-xml', (req, res) => {
  const {
    query: { author }
  } = req;

  res.send(xmlTestData);
});

app.listen(PORT, async () => {
  console.info(`Server running on port ${PORT}`);

  // Here we call wxample scripts which calls
  // this server and server data based on author name
  console.log('----------------------------------------');
  console.log('Calling examples scripts');

  runExamples();

  console.log('Examples scripts done');
  console.log('----------------------------------------');
});
