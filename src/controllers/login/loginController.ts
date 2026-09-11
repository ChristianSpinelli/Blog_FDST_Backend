import { Request, Response, NextFunction } from 'express';
import { LoginRequest } from "../../model/login/login.model";
import { UserResponse } from "../../model/user/user.model";
import { LoginRepository } from "../../repositories/login/loginRepository";
import { LoginService } from "../../services/login/loginService";

const loginRepository = new LoginRepository();
const loginService = new LoginService(loginRepository);

export class LoginController{
    async login(req:Request, res:Response, next:NextFunction):Promise<void>{
        try{
            const loginRequest: LoginRequest = req.body;
            const loginResponse: UserResponse = await loginService.login(loginRequest);
            res.status(200).json(loginResponse);
        }catch(error){
            next(error);
        }
    }
}