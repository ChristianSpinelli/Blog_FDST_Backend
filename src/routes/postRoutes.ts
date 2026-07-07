import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authorizeRoles } from '../middlewares/authMiddleware';
import { Perfil } from '../model/perfil.model';
import { authenticateMock } from '../middlewares/authMockMiddleware';

const router = Router();
const postController = new PostController();

router.post('/', authenticateMock(), authorizeRoles(Perfil.professor), postController.createPost);
router.get('/', authenticateMock(), authorizeRoles(Perfil.aluno, Perfil.professor), postController.listPosts);
router.get('/search', authenticateMock(), authorizeRoles(Perfil.aluno, Perfil.professor), postController.searchPost);
router.get('/:id', authenticateMock(), authorizeRoles(Perfil.aluno), postController.findPostById);
router.put('/:id', authenticateMock(), authorizeRoles(Perfil.professor), postController.editPost);
router.delete('/:id', authenticateMock(), authorizeRoles(Perfil.professor), postController.deletePost);

export default router;