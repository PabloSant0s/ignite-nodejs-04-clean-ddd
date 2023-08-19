import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '@test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from '@test/factories/make-answer-attachment'

let answerRepository: InMemoryAnswerRepository
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswerRepository(answerAttachmentsRepository)
    sut = new EditAnswerUseCase(answerRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
    await answerRepository.create(answer)

    answerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Conteudo teste',
      attachmentsIds: ['1', '3'],
    })

    expect(answerRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
    expect(answerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('3'),
      }),
    ])
  })

  it('should not be able to edit a answer from another user', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
    await answerRepository.create(answer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: answer.id.toString(),
      content: 'Conteudo teste',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
