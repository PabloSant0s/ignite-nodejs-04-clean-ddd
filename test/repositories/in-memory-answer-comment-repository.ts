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
