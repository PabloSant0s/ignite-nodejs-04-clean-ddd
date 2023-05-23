import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FectchRecentQuestionsUseCaseRequest {
  page: number
}
type FectchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FectchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FectchRecentQuestionsUseCaseRequest): Promise<FectchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })
    return right({
      questions,
    })
  }
}
