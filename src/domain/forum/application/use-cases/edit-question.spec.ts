import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@test/factories/make-question'
import { makeQuestionAttachments } from '@test/factories/make-question-attachments'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let questionRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      questionRepository,
      questionAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    await questionRepository.create(question)

    questionAttachmentsRepository.items.push(
      makeQuestionAttachments({
        questionId: question.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachments({
        questionId: question.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteudo teste',
      title: 'Pergunta teste',
      questionId: question.id.toValue(),
      attachments: ['1', '3'],
    })

    expect(questionRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
      title: 'Pergunta teste',
    })

    expect(questionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    await questionRepository.create(question)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'Conteudo teste',
      title: 'Pergunta teste',
      questionId: question.id.toValue(),
      attachments: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
