import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authorizeRoles } from '../middlewares/authMiddleware';
import { Perfil } from '../model/perfil.model';

const router = Router();
const postController = new PostController();

// Endpoint de Criação de Postagens
router.post('/', authorizeRoles(Perfil.professor), postController.create);
router.get('/', authorizeRoles(Perfil.aluno, Perfil.professor), postController.list);

export default router;