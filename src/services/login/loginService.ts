import { LoginRequest } from "../../model/login/login.model";
import { UserResponse } from "../../model/user/user.model";
import { LoginRepository } from "../../repositories/login/loginRepository";

export class LoginService{
    private loginRepository: LoginRepository;

    constructor(loginRepository: LoginRepository){
        this.loginRepository = loginRepository;
    }

    async login(data:LoginRequest): Promise<UserResponse>{
        if(!data.username || data.username.trim() === ''){
            throw new Error('O username é obrigatório.');
        }

         if(!data.password || data.password.trim() === ''){
            throw new Error('A senha é obrigatória.');
        }

        const response = await this.loginRepository.login(data);

        if(response === null){
            throw new Error('Usuário não encontrado.');
        }
        
        return response; 
    }
}