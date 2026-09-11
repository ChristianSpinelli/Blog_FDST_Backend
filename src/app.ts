import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';
import postRoutes from './routes/post/postRoutes';
import userRoutes from './routes/user/userRoutes';
import loginRoutes from './routes/login/loginRoutes';
import cors from 'cors';

const app = express();

//liberar o cors para o meu frontend React+Vite
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'x-user-username'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

//api para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'PostgreSQL conectado via Prisma 7' });
});

app.use('/posts', postRoutes);

app.use("/users", userRoutes);

app.use("/login", loginRoutes)

//utilizando o middleware de erro
app.use(errorHandler);

export default app;