import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Perfil } from '../model/perfil.model';

export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.headers['x-user-role'] as string;
    const userId = req.headers['x-user-id'] as string;

    //passando no lugar do jwt token dois parâmetros no cabeçalho para identificar usuário e role
    if (!userRole || !userId) {
      res.status(401).json({ message: 'Acesso negado. Usuário não autenticado.' });
      return;
    }

    (req as any).user = {
      id: Number(userId),
      role: userRole.toLowerCase()
    };

    const currentUser = (req as any).user as UserPayload;

    if (!allowedRoles.includes(currentUser.role)) {
      let message = 'Acesso negado. Ação permitida apenas para alunos e professores.';
      
      if(!allowedRoles.includes(Perfil.aluno)){
        message = 'Acesso negado. Ação permitida apenas para professores.';
      }

      res.status(403).json({ message });
      return;
    }

    next();
  };
};