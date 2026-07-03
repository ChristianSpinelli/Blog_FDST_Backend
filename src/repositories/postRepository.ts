import { prisma } from '../config/database'; 
import { PostRequest, PostResponse } from '../model/post.model';

export class PostRepository {
  async create(data: PostRequest): Promise<PostResponse> {
    return await prisma.post.create({
      data: {
        ...data
      },
    });
  }

  async list(): Promise<Array<PostResponse>>{
    return await prisma.post.findMany();
  }

  async findPostById(id:number): Promise<PostResponse | null>{
    return await prisma.post.findUnique({
      where:{ id }
    })
  }

}