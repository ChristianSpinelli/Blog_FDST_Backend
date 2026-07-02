import { prisma } from '../config/database'; 
import { Post } from '../model/post.model';

export class PostRepository {
  async create(data: Post) {
    return await prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
      },
    });
  }
}