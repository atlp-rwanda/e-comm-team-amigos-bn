<<<<<<< HEAD
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user';
=======
import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
>>>>>>> 3d20cd5 (chore(project structure): remove unnecessary codes and adress reviewer feedback #184581160)

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use('/user', userRoute);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, There! this is Amigos ecommerce team project.');
});

export default app;
