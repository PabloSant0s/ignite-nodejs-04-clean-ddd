import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async findById(answerCommentId: string) {
    return (
      this.items.find((item) => item.id.toString() === answerCommentId) ?? null
    )
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const indexItem = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    this.items.splice(indexItem, 1)
  }
}
