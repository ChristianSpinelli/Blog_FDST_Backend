import { prisma } from "../../config/database";
import { LoginRequest } from "../../model/login/login.model";
import { UserResponse } from "../../model/user/user.model";

export class LoginRepository{
    async login(data: LoginRequest):Promise<UserResponse | null>{
        return await prisma.user.findUnique({
            where: {
                username: data.username,
                password: data.password
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