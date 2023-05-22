import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: string
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  public get answerId() {
    return this.props.answerId
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
