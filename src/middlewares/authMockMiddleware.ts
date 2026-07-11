import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserService } from '../services/user/userService';
import { UserRepository } from '../repositories/user/userRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const authenticateMock = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const usernameHeader = req.headers['x-user-username'] as string;

      if (!usernameHeader) {
        res.status(401).json({ message: 'Acesso negado. Header x-user-username não fornecido.' });
        return;
      }

      const user = await userService.findUserByUsername(usernameHeader);

      (req as any).user = user;

      next();
    } catch (error: any) {
      // Acesso negado com usuário inexistente
      res.status(401).json({ message: 'Falha na autenticação. Usuário inexistente.' });
    }
  };
};