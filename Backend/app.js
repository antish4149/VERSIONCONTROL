import express from 'express';
import cors from 'cors';
import mainRouter from './routes/mainRoute.js';

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);

export default app;