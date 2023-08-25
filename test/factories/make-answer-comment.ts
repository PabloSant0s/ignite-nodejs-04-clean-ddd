import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  props: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      content: props.content ?? faker.lorem.text(),
      authorId: props.authorId ?? new UniqueEntityID(),
      answerId: props.answerId ?? new UniqueEntityID(),
      ...props,
    },
    id,
  )

  return answerComment
}
