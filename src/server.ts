import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { jsonTestData, runExamples, xmlTestData } from './api/search';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/get-by/:by', (req, res) => {
  const {
    query: { value },
    params: { by }
  } = req;

  const response = jsonTestData[by][(value as string).toLowerCase()];

  res.send(JSON.stringify(response));
});

app.get('/get-xml', (req, res) => {
  res.send(xmlTestData);
});

app.listen(PORT, async () => {
  console.info(`Server running on port ${PORT}`);

  // Here we call example scripts which calls
  console.log('----------------------------------------');
  console.log('Calling examples scripts');

  await runExamples();

  console.log('Examples scripts done');
  console.log('----------------------------------------');
});
