import { PostRequest, PostResponse } from '../model/post.model';
import { PostRepository } from '../repositories/postRepository';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: PostRequest): Promise<PostResponse> {
    if (!data.title || data.title.trim() === '') {
      throw new Error('O título do post é obrigatório.');
    }
    
    if (!data.body || data.body.trim() === '') {
      throw new Error('O conteúdo (body) do post é obrigatório.');
    }

    return await this.postRepository.create(data);
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
}