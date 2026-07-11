import { UserRequest, UserResponse } from "../../model/user/user.model";
import { UserRepository } from "../../repositories/user/userRepository";

export class UserService{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async createUser(data:UserRequest):Promise<UserResponse>{
        if(!data.email || data.email.trim() === ''){
            throw new Error('O email do usuário é obrigatório.');
        }

        if(!data.name || data.name.trim() === ''){
            throw new Error('O nome do usuário é obrigatório.');
        }

        if(!data.username || data.username.trim() === ''){
            throw new Error('O username do usuário é obrigatório.');
        }

        if(!data.password || data.password.trim() === ''){
            throw new Error('A senha do usuário é obrigatória.');
        }

        if(!data.role || data.role.trim() === ''){
            throw new Error('A categoria do usuário é obrigatória.');
        }

        return await this.userRepository.create(data);
    }

    async listUsers():Promise<Array<UserResponse>>{
        return await this.userRepository.list();
    }

    async findUserByUsername(username:string):Promise<UserResponse>{
        const response = await this.userRepository.findByUsername(username);

        if(response === null){
            throw new Error('Usuário não encontrado.');
        }

        return response;
    }
}