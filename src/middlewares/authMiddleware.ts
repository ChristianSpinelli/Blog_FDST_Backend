import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserResponse } from '../model/user.model';

export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
   
    const user: UserResponse | null = (req as any).user as UserResponse | null;

    if (user === null) {
      res.status(401).json({ message: 'Acesso negado. Usuário não autenticado.' });
      return;
    }

    const currentUser = (req as any).user as UserResponse;

    if (!allowedRoles.includes(currentUser.role)) {
      let message = 'Acesso negado. Ação não permitida para o perfil informado.';
    
      res.status(403).json({ message });
      return;
    }

    next();
  };
};