import { prisma } from "../config/database";
import { UserRequest, UserResponse } from "../model/user.model";

export class UserRepository{
    async create(data:UserRequest):Promise<UserResponse>{
        return await prisma.user.create({
            data:{ ...data }
        })
    }

    async list(): Promise<Array<UserResponse>>{
        return await prisma.user.findMany();
    }

    async findByUsername(username:string):Promise<UserResponse | null>{
        return await prisma.user.findUnique({ 
            where:{
                username
            },
            select:{
                id:true,
                name:true,
                username:true,
                email:true,
                role:true
            }
        })
    }
}