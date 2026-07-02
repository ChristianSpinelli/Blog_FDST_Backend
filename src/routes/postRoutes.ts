import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();
const postController = new PostController();

// Endpoint de Criação de Postagens
router.post('/', authorizeRoles('professor'), postController.create);

export default router;