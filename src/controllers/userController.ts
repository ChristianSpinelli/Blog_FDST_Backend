import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserRequest } from "../model/user.model";

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export class UserController{
    async create(req:Request, res:Response, next:NextFunction): Promise<void>{
        try{
            const userRequest:UserRequest = req.body as UserRequest; 

            const newUser = await userService.createUser(userRequest);
            
            res.status(201).json(newUser);
        }catch(error){
            next(error);
        }
    }

    async list(req:Request, res:Response, next:NextFunction): Promise<void>{
        try{
            const users = await userService.listUsers();

            res.status(200).json(users);
        }catch(error){
            next(error);
        }
    }
}