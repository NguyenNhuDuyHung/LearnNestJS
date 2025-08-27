import { ObjectType, Field, Int } from '@nestjs/graphql'
import { CommentEntity } from 'src/comment/entities/comment.entity'
import { Tag } from 'src/tag/entities/tag.entity'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class Count {
  @Field(() => Int)
  likes: number

  @Field(() => Int)
  comments: number
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number

  @Field(() => String)
  title: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  thumbnail?: string

  @Field(() => String)
  content: string

  @Field(() => Boolean)
  published: boolean

  @Field(() => User)
  author: User

  @Field(() => [Tag])
  tags: Tag[]

  @Field(() => [CommentEntity])
  comments: CommentEntity[]

  @Field(() => Count)
  _count: Count

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
