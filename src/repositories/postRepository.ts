import { prisma } from '../config/database'; 
import { PostRequest } from '../model/post.model';

export class PostRepository {
  async create(data: PostRequest) {
    return await prisma.post.create({
      data: {
        ...data
      },
    });
  }

  async list(){
    return await prisma.post.findMany();
  }
}