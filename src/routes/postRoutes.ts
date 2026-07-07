import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authorizeRoles } from '../middlewares/authMiddleware';
import { Perfil } from '../model/perfil.model';
import { authenticateMock } from '../middlewares/authMockMiddleware';

const router = Router();
const postController = new PostController();

router.post('/', authenticateMock(), authorizeRoles(Perfil.professor), postController.create);
router.get('/', authenticateMock(), authorizeRoles(Perfil.aluno, Perfil.professor), postController.list);
router.get('/:id', authenticateMock(), authorizeRoles(Perfil.aluno), postController.findPostById);
router.put('/:id', authenticateMock(), authorizeRoles(Perfil.professor), postController.editPost);

export default router;