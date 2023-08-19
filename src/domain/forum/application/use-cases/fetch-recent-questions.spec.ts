import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { FectchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachments-repository'

let questionsRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: FectchRecentQuestionsUseCase
describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new FectchRecentQuestionsUseCase(questionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )

    const result = await sut.execute({ page: 1 })
    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let index = 0; index < 22; index++) {
      await questionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toHaveLength(2)
  })
})
