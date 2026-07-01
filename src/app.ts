import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());

//api para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'PostgreSQL conectado via Prisma 7' });
});

//utilizando o middleware de erro
app.use(errorHandler);

export default app;