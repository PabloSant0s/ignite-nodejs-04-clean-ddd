import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: string
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  public get questionId() {
    return this.props.questionId
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
