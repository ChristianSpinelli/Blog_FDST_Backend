import { Request, Response, NextFunction } from 'express';
import { PostService } from '../../services/post/postService';
import { PostRepository } from '../../repositories/post/postRepository';
import { PostRequest, PostResponse } from '../../model/post/post.model';
import { UserResponse } from '../../model/user/user.model';

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

export class PostController {
  async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postRequest: PostRequest = req.body;
      const user:UserResponse = (req as any).user;
      
      const newPost: PostResponse = await postService.createPost(postRequest, user.id);
      
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async listPosts(req: Request, res: Response, next: NextFunction): Promise<void>{
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

  async editPost(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
       const { id } = req.params;
       const postRequest: PostRequest = req.body;
       const user:UserResponse = (req as any).user;
       const post:PostResponse = await postService.editPost(postRequest, Number(id), user.id);
       res.status(200).json(post);
    }catch(error){
      next(error);
    }
  }

  async deletePost(req: Request, res:Response, next: NextFunction): Promise<void>{
    try{
      const { id } = req.params;
      await postService.deletePost(Number(id));
      res.status(200).json("Post apagado com sucesso.");
    }catch(error){
      next(error);
    }
  }

  async searchPost(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
      const { search } = req.query;
      const posts: Array<PostResponse> = await postService.searchPost(search as string);
      res.status(200).json(posts);
    }catch(error){
      next(error);
    }
  }
}