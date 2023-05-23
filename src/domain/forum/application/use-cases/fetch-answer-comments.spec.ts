import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comment-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    for (let index = 0; index < 3; index++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let index = 0; index < 22; index++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
