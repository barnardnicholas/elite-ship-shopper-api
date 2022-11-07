import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fetchShoppingList from './controllers/search';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/search', (request: Request, response: Response) => {
  const {
    modules = [],
    range = 20,
    startCoords = { x: 0, y: 0, z: 0 },
    liveFetch = false,
  } = request.body;

  fetchShoppingList({ modules, range, startCoords, liveFetch })
    .then((responseData) => {
      response.status(200).send(responseData);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
