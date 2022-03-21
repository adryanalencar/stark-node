import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { router } from './routes';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.text({ type: '*/*' }));
app.use(router);


export { app };