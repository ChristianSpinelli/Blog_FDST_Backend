import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/postService';
import { PostRepository } from '../repositories/postRepository';

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

export class PostController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, body, author } = req.body;
      
      const newPost = await postService.createPost({ title, body, author });
      
      res.status(201).json(newPost);
    } catch (error) {
      next(error); // encaminha o erro para o middleware
    }
  }
}