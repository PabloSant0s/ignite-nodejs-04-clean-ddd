import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  props: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      content: props.content ?? faker.lorem.text(),
      authorId: props.authorId ?? new UniqueEntityID(),
      questionId: props.questionId ?? new UniqueEntityID(),
      ...props,
    },
    id,
  )

  return questionComment
}
