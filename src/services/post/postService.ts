import { PostRequest, PostResponse } from '../../model/post/post.model';
import { PostRepository } from '../../repositories/post/postRepository';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: PostRequest, authorId:number ): Promise<PostResponse> {
    if (!data.title || data.title.trim() === '') {
      throw new Error('O título do post é obrigatório.');
    }
    
    if (!data.body || data.body.trim() === '') {
      throw new Error('O conteúdo (body) do post é obrigatório.');
    }

    return await this.postRepository.create(data, authorId);
  }

  async listPosts(): Promise<Array<PostResponse>>{
    return await this.postRepository.list();
  }

  async findPostById(id:number): Promise<PostResponse> {
    const response = await this.postRepository.findPostById(id);

    if(response === null){
      throw new Error("Post não encontrado.");
    }

    return response;
  }

  async editPost(post:PostRequest, id:number, authorId:number): Promise<PostResponse>{
    if(
      post?.title === undefined && 
      post?.body === undefined &&
      post?.description === undefined
    ){
      throw new Error("É obrigatório informar ao menos um campo para atualizar o conteúdo.");
    }

    return await this.postRepository.editPost(post, id, authorId);
  }

  async deletePost(id:number): Promise<PostResponse>{
    return await this.postRepository.deletePost(id);
  }

  async searchPost(search:string): Promise<Array<PostResponse>>{
    return await this.postRepository.searchPost(search);
  }
}