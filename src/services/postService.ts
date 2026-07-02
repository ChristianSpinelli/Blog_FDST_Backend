import { PostRepository } from '../repositories/postRepository';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: { title: string; body: string; author: string }) {
    if (!data.title || data.title.trim() === '') {
      throw new Error('O título do post é obrigatório.');
    }
    if (!data.body || data.body.trim() === '') {
      throw new Error('O conteúdo (body) do post é obrigatório.');
    }
    if (!data.author || data.author.trim() === '') {
      throw new Error('O autor do post é obrigatório.');
    }

    return await this.postRepository.create(data);
  }
}