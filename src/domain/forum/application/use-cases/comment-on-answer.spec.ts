import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '@test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswerRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
  })

  it('should be able to create a answer comment', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
    await answersRepository.create(answer)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'Comentario teste',
      answerId: answer.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(answerCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
