import { prisma } from '../../config/database'; 
import { PostRequest, PostResponse } from '../../model/post/post.model';

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
    });
  }

  async editPost(post:PostRequest, id:number): Promise<PostResponse>{
    return await prisma.post.update({
      where:{
        id
      },
      data:{
        title:post?.title,
        body:post?.body
      }
    });
  }

  async deletePost(id:number): Promise<PostResponse>{
    return await prisma.post.delete({
      where:{ id }
    });
  }

  async searchPost(search:string): Promise<Array<PostResponse>>{
    return await prisma.post.findMany({
      where:{
        OR:[
          { title: { contains: search, mode:"insensitive" } },
          { body: { contains: search, mode:"insensitive" } },
        ]
      }
    });
  }

}