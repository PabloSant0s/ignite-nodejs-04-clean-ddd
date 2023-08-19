import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)
    await this.questionAttachmentsRepository.delete(question.id.toString())
  }

  async save(question: Question) {
    const indexItem = this.items.findIndex((item) => item.id === question.id)
    this.items[indexItem] = question
  }

  async findById(questionId: string) {
    return this.items.find((item) => item.id.toString() === questionId) ?? null
  }

  async findBySlug(slug: string) {
    return this.items.find((item) => item.slug.value === slug) ?? null
  }

  async findManyRecent({ page }: PaginationParams) {
    return this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
