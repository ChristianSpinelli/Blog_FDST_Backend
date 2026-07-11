import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PostService } from './postService';
import { PostRepository } from '../../repositories/post/postRepository';
import { PostResponse } from '../../model/post/post.model';

describe('PostService', () => {
  let postService: PostService;
  let postRepositoryMock: DeepMockProxy<PostRepository>;

  beforeEach(() => {
    //mockando repository
    postRepositoryMock = mockDeep<PostRepository>();
    postService = new PostService(postRepositoryMock);
    //reseta para o próximo teste
    mockReset(postRepositoryMock);
  });

  describe('createPost', () => {
    it('deve criar um post com sucesso se os dados forem válidos', async () => {
      const inputData = { title: 'Novo Post', body: 'Conteúdo do post' };
      const expectedOutput: PostResponse = { id: 1, title: 'Novo Post', body: 'Conteúdo do post' };

      postRepositoryMock.create.mockResolvedValue(expectedOutput);

      const result = await postService.createPost(inputData);

      expect(result).toEqual(expectedOutput);
      expect(postRepositoryMock.create).toHaveBeenCalledWith(inputData);
    });

    it('deve lançar um erro se o título estiver vazio', async () => {
      const inputData = { title: '   ', body: 'Conteúdo do post' };

      await expect(postService.createPost(inputData)).rejects.toThrow('O título do post é obrigatório.');
      
      expect(postRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('findPostById', () => {
    it('deve retornar o post caso ele exista no banco', async () => {
      const mockPost: PostResponse = { id: 10, title: 'Post Existente', body: 'Corpo' };
      postRepositoryMock.findPostById.mockResolvedValue(mockPost);

      const result = await postService.findPostById(10);

      expect(result).toEqual(mockPost);
    });

    it('deve lançar um erro caso o repositório retorne null', async () => {
      postRepositoryMock.findPostById.mockResolvedValue(null as any);

      await expect(postService.findPostById(999)).rejects.toThrow('Post não encontrado.');
    });
  });

  describe('editPost', () => {
    it('deve lançar um erro se tentar atualizar sem enviar title e sem enviar body', async () => {
      const inputData = { title: undefined as any, body: undefined as any };

      await expect(postService.editPost(inputData, 1)).rejects.toThrow(
        'É obrigatório informar título ou conteúdo para atualizar.'
      );
    });
  });

  describe('searchPost', () => {
    it('deve chamar o repositório repassando o termo de busca corretamente', async () => {
      const mockLista: PostResponse[] = [{ id: 1, title: 'Aulas de Node', body: 'Express' }];
      postRepositoryMock.searchPost.mockResolvedValue(mockLista);

      const result = await postService.searchPost('Node');

      expect(result).toEqual(mockLista);
      expect(postRepositoryMock.searchPost).toHaveBeenCalledWith('Node');
    });
  });
});