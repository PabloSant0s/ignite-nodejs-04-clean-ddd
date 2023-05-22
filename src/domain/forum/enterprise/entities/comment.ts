import { Entity } from '@/core/entities/entity'

export interface CommentProps {
  authorId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  public get authorId() {
    return this.props.authorId
  }

  public get content() {
    return this.props.content
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
