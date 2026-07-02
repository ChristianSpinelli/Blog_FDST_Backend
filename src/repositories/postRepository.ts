import { prisma } from '../config/database'; 
import { PostRequest } from '../model/post.model';

export class PostRepository {
  async create(data: PostRequest) {
    return await prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
      },
    });
  }
}