import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '@test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(answerRepository)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await answerRepository.create(answer)

    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })

    expect(answerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await answerRepository.create(answer)

    await expect(() => {
      return sut.execute({ answerId: 'answer-1', authorId: 'author-2' })
    }).rejects.toBeInstanceOf(Error)
  })
})
