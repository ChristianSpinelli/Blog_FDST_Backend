import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PostRepository } from './postRepository';
import { PostRequest, PostResponse } from '../../model/post/post.model';
import { prisma } from '../../config/database';

// mock prisma client para simular banco
jest.mock('../../config/database', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('PostRepository', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    postRepository = new PostRepository();
    //reseta as alterações para não afetar o próximo teste
    mockReset(prismaMock);
  });

  describe('create', () => {
    it('deve chamar o prisma.post.create com os dados corretos', async () => {
      const inputData: PostRequest = { title: 'Novo Post', body: 'Conteúdo' };
      const expectedOutput: PostResponse = { id: 1, title: 'Novo Post', body: 'Conteúdo' };

      prismaMock.post.create.mockResolvedValue(expectedOutput);

      const result = await postRepository.create(inputData);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.create).toHaveBeenCalledWith({
        data: { ...inputData },
      });
    });
  });

  describe('list', () => {
    it('deve retornar uma lista de posts cadastrados', async () => {
      const expectedOutput: PostResponse[] = [
        { id: 1, title: 'Post 1', body: 'Corpo 1' },
        { id: 2, title: 'Post 2', body: 'Corpo 2' },
      ];

      prismaMock.post.findMany.mockResolvedValue(expectedOutput);

      const result = await postRepository.list();

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findPostById', () => {
    it('deve retornar um post específico ao passar um ID existente', async () => {
      const expectedOutput: PostResponse = { id: 5, title: 'Post 5', body: 'Corpo 5' };

      prismaMock.post.findUnique.mockResolvedValue(expectedOutput);

      const result = await postRepository.findPostById(5);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
        where: { id: 5 },
      });
    });

    it('deve retornar null se o post não for encontrado', async () => {
      prismaMock.post.findUnique.mockResolvedValue(null);

      const result = await postRepository.findPostById(1234);

      expect(result).toBeNull();
    });
  });

  describe('editPost', () => {
    it('deve chamar o prisma.post.update com o id e payload corretos', async () => {
      const updateData: PostRequest = { title: 'Título Atualizado', body: 'Corpo Atualizado' };
      const expectedOutput: PostResponse = { id: 1, title: 'Título Atualizado', body: 'Corpo Atualizado' };

      prismaMock.post.update.mockResolvedValue(expectedOutput);

      const result = await postRepository.editPost(updateData, 1);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: updateData.title,
          body: updateData.body,
        },
      });
    });
  });

  describe('deletePost', () => {
    it('deve chamar o prisma.post.delete com o id correto', async () => {
      const expectedOutput: PostResponse = { id: 2, title: 'Deletado', body: 'Deletado' };

      prismaMock.post.delete.mockResolvedValue(expectedOutput);

      const result = await postRepository.deletePost(2);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.delete).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });

  describe('searchPost', () => {
    it('deve passar os parâmetros de busca em OR e em modo "insensitive" para o Prisma', async () => {
      const searchTerms = 'TypeScript';
      const expectedOutput: PostResponse[] = [{ id: 1, title: 'Aulas de TypeScript', body: 'Conteúdo' }];

      prismaMock.post.findMany.mockResolvedValue(expectedOutput);

      const result = await postRepository.searchPost(searchTerms);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.post.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: searchTerms, mode: 'insensitive' } },
            { body: { contains: searchTerms, mode: 'insensitive' } },
          ],
        },
      });
    });
  });
});