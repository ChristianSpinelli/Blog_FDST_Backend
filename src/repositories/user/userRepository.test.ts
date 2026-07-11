import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from './userRepository';
import { UserRequest, UserResponse } from '../../model/user/user.model';
import { prisma } from '../../config/database';
import { Perfil } from '../../model/utils/perfil.model';

// mock do prisma client
jest.mock('../../config/database', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    //reseta para que as alterações não afetem o próximo teste
    mockReset(prismaMock);
  });

  describe('create', () => {
    it('deve chamar o prisma.user.create com os dados corretos', async () => {
      const inputData: UserRequest = {
        name: 'Maria Souza',
        email: 'maria@email.com',
        username: 'mariasouza',
        password: 'password123',
        role: Perfil.admin,
      };

      const expectedOutput: UserResponse = {
        id: 1,
        name: inputData.name,
        email: inputData.email,
        username: inputData.username,
        role: inputData.role,
      };

      prismaMock.user.create.mockResolvedValue(expectedOutput as any);

      const result = await userRepository.create(inputData);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: { ...inputData },
      });
    });
  });

  describe('list', () => {
    it('deve retornar uma lista com todos os usuários cadastrados', async () => {
      const expectedOutput: UserResponse[] = [
        { id: 1, name: 'User 1', email: 'u1@u.com', username: 'u1', role: Perfil.professor },
        { id: 2, name: 'User 2', email: 'u2@u.com', username: 'u2', role: Perfil.aluno },
      ];

      prismaMock.user.findMany.mockResolvedValue(expectedOutput as any);

      const result = await userRepository.list();

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByUsername', () => {
    it('deve chamar o prisma.user.findUnique aplicando o filtro e o select corretamente', async () => {
      const inputUsername = 'dev_thiago';
      const expectedOutput: UserResponse = {
        id: 10,
        name: 'Thiago',
        email: 'thiago@u.com',
        username: inputUsername,
        role: Perfil.professor,
      };

      prismaMock.user.findUnique.mockResolvedValue(expectedOutput as any);

      const result = await userRepository.findByUsername(inputUsername);

      expect(result).toEqual(expectedOutput);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          username: inputUsername,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
        },
      });
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await userRepository.findByUsername('user_123');

      expect(result).toBeNull();
    });
  });
});