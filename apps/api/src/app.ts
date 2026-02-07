import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorMiddleware);

app.get('/health', (req, res) => {
  res.send('Gym Membership API is running');
});