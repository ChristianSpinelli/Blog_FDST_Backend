import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {

    //verifica se está autenticado
    if (!req.user) {
      res.status(401).json({ message: 'Não autenticado.' });
      return;
    }
    
    //verifica se inclue a role específica para acessar o serviço correspondente.
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
      return;
    }

    next();
  };
};