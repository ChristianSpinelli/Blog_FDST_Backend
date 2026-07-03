import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/postService';
import { PostRepository } from '../repositories/postRepository';
import { PostRequest, PostResponse } from '../model/post.model';

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

export class PostController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postRequest: PostRequest = req.body as PostRequest;
      
      const newPost = await postService.createPost(postRequest);
      
      res.status(201).json(newPost);
    } catch (error) {
      next(error); // encaminha o erro para o middleware
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const posts: Array<PostResponse> = await postService.listPosts();

      res.status(200).json(posts);
    }catch(error){
      next(error);
    }
  }

  async findPostById(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const { id } = req.params;

      const post: PostResponse = await postService.findPostById(Number(id));

      res.status(200).json(post);
    }catch(error){
      next(error);
    }
  }
}