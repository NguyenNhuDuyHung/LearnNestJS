import { Injectable } from '@nestjs/common'
import { DEFAULT_PAGE_SIZE } from 'src/constants'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number
    take?: number
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    })
  }

  async count() {
    return await this.prisma.post.count()
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id },
      include: {
        author: true,
        tags: true,
        comments: true,
      },
    })
  }

  async findByUser({
    userId,
    skip,
    take,
  }: {
    userId: number
    skip?: number
    take?: number
  }) {
    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
      skip,
      take,
      select: {
        id: true,
        content: true,
        published: true,
        title: true,
        slug: true,
        thumbnail: true,
        createdAt: true,
        _count: { select: { comments: true, likes: true } },
      },
    })

    return posts
  }

  async userPostCount(userId: number) {
    return await this.prisma.post.count({ where: { authorId: userId } })
  }
}
