import { prisma } from '../../config/database'; 
import { PostRequest, PostResponse } from '../../model/post/post.model';

export class PostRepository {
  async create(data: PostRequest, authorId: number): Promise<PostResponse> {
    return await prisma.post.create({
      data: {
        ...data,
        authorId
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async list(): Promise<Array<PostResponse>> {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async findPostById(id: number): Promise<PostResponse | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async editPost(post: PostRequest, id: number): Promise<PostResponse> {
    return await prisma.post.update({
      where: { id },
      data: {
        title: post?.title,
        body: post?.body
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async deletePost(id: number): Promise<PostResponse> {
    return await prisma.post.delete({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async searchPost(search: string): Promise<Array<PostResponse>> {
    return await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { body: { contains: search, mode: "insensitive" } },
        ]
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
  }
}