import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erro capturado:', error.message);

  // erro comum de validação
  if (error.message.includes('obrigatório') || error.message.includes('não encontrado')) {
    res.status(400).json({ error: error.message });
    return;
  }

  if(error.message.includes('Unique constraint') && error.message.includes("email")){
    res.status(400).json({ error: "O username informado já existe. Tente novamente." });
    return;
  }

  // erro genérico do servidor
  res.status(500).json({ error: 'Erro interno no servidor.' });
};