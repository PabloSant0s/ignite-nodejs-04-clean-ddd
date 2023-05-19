import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '@test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(answerRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
    await answerRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Conteudo teste',
    })

    expect(answerRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
    await answerRepository.create(answer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
        content: 'Conteudo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
