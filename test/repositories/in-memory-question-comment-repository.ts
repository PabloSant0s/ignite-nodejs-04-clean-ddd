import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []

  async findById(questionCommentId: string) {
    return (
      this.items.find((item) => item.id.toString() === questionCommentId) ??
      null
    )
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const indexItem = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    this.items.splice(indexItem, 1)
  }
}
