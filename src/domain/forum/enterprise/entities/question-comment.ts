import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
  authorId: string
  questionId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  public get authorId() {
    return this.props.authorId
  }

  public get questionId() {
    return this.props.questionId
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
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    )

    return questionComment
  }
}
