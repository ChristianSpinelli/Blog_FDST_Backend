import { prisma } from "../config/database";
import { UserRequest } from "../model/user.model";

export class UserRepository{
    async create(data:UserRequest){
        return await prisma.user.create({
            data:{ ...data }
        })
    }
}