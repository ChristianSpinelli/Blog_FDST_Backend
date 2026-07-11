import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { UserService } from './userService';
import { UserRepository } from '../../repositories/user/userRepository';
import { UserResponse } from '../../model/user/user.model';
import { Perfil } from '../../model/utils/perfil.model';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: DeepMockProxy<UserRepository>;

  beforeEach(() => {
    //mockando repository
    userRepositoryMock = mockDeep<UserRepository>();
    userService = new UserService(userRepositoryMock);
    
    // reseta para não afetar o próximo teste
    mockReset(userRepositoryMock);
  });

  describe('createUser', () => {
    const validUserRequest = {
      name: 'João Silva',
      email: 'joao@email.com',
      username: 'joaosilva',
      password: 'senha123',
      role: Perfil.aluno,
    };

    it('deve criar um usuário com sucesso se todos os dados forem válidos', async () => {
      const expectedOutput: UserResponse = { id: 1, ...validUserRequest };
      userRepositoryMock.create.mockResolvedValue(expectedOutput);

      const result = await userService.createUser(validUserRequest);

      expect(result).toEqual(expectedOutput);
      expect(userRepositoryMock.create).toHaveBeenCalledWith(validUserRequest);
    });

    it('deve lançar um erro se o email estiver vazio ou ausente', async () => {
      const invalidData = { ...validUserRequest, email: '   ' };

      await expect(userService.createUser(invalidData)).rejects.toThrow(
        'O email do usuário é obrigatório.'
      );
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('deve lançar um erro se o nome estiver vazio ou ausente', async () => {
      const invalidData = { ...validUserRequest, name: '' };

      await expect(userService.createUser(invalidData)).rejects.toThrow(
        'O nome do usuário é obrigatório.'
      );
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('deve lançar um erro se o username estiver vazio ou ausente', async () => {
      const invalidData = { ...validUserRequest, username: undefined as any };

      await expect(userService.createUser(invalidData)).rejects.toThrow(
        'O username do usuário é obrigatório.'
      );
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('deve lançar um erro se a senha estiver vazia ou ausente', async () => {
      const invalidData = { ...validUserRequest, password: '' };

      await expect(userService.createUser(invalidData)).rejects.toThrow(
        'A senha do usuário é obrigatória.'
      );
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('deve lançar um erro se o role estiver vazio ou ausente', async () => {
      const invalidData = { ...validUserRequest, role: '  ' };

      await expect(userService.createUser(invalidData)).rejects.toThrow(
        'A categoria do usuário é obrigatória.'
      );
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('listUsers', () => {
    it('deve retornar uma lista contendo todos os usuários do repositório', async () => {
      const mockUsers: UserResponse[] = [
        { id: 1, name: 'User 1', email: 'u1@u.com', username: 'u1', role: Perfil.professor },
        { id: 2, name: 'User 2', email: 'u2@u.com', username: 'u2', role: Perfil.aluno },
      ];
      userRepositoryMock.list.mockResolvedValue(mockUsers);

      const result = await userService.listUsers();

      expect(result).toEqual(mockUsers);
      expect(userRepositoryMock.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserByUsername', () => {
    it('deve retornar o usuário correspondente caso o username exista', async () => {
      const mockUser: UserResponse = {
        id: 10,
        name: 'Maria',
        email: 'maria@u.com',
        username: 'maria_dev',
        role: Perfil.aluno,
      };
      userRepositoryMock.findByUsername.mockResolvedValue(mockUser);

      const result = await userService.findUserByUsername('maria_dev');

      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith('maria_dev');
    });

    it('deve lançar um erro caso o repositório retorne null', async () => {
      userRepositoryMock.findByUsername.mockResolvedValue(null as any);

      await expect(userService.findUserByUsername('usuario_123')).rejects.toThrow(
        'Usuário não encontrado.'
      );
    });
  });
});