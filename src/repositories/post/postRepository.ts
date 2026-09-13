import { prisma } from '../../config/database'; 
import { PostRequest, PostResponse } from '../../model/post/post.model';

export class PostRepository {
  async create(data: PostRequest, authorId: number): Promise<PostResponse> {
    return await prisma.post.create({
      data: {
        ...data,
        authorId
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async list(): Promise<Array<PostResponse>> {
    return await prisma.post.findMany({
      orderBy:{
        id:'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findPostById(id: number): Promise<PostResponse | null> {
    return await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async editPost(post: PostRequest, postId: number, authorId:number): Promise<PostResponse> {
    return await prisma.post.update({
      where: { id: postId },
      data: {
        title: post?.title,
        body: post?.body,
        description: post?.description,
        authorId
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deletePost(id: number): Promise<PostResponse> {
    return await prisma.post.delete({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
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
      orderBy:{
        id:'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}