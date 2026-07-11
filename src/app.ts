import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';
import postRoutes from './routes/post/postRoutes';
import userRoutes from './routes/user/userRoutes';

const app = express();

app.use(express.json());

//api para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'PostgreSQL conectado via Prisma 7' });
});

app.use('/posts', postRoutes);

app.use("/users", userRoutes);

//utilizando o middleware de erro
app.use(errorHandler);

export default app;