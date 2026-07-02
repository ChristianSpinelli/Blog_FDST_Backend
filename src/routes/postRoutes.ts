import { Router } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();
const postController = new PostController();

// Endpoint de Criação de Postagens
router.post('/', postController.create);

export default router;