import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: string
  answerId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  public get authorId() {
    return this.props.authorId
  }

  public get answerId() {
    return this.props.answerId
  }

  public get content() {
    return this.props.content
  }

  public set content(content: string) {
    this.props.content = content
    this.touch()
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

  public create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    )

    return answerComment
  }
}
