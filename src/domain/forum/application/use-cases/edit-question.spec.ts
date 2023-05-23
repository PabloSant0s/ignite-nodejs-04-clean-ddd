import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let questionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    await questionRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteudo teste',
      title: 'Pergunta teste',
      questionId: question.id.toValue(),
    })

    expect(questionRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
      title: 'Pergunta teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    await questionRepository.create(question)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'Conteudo teste',
      title: 'Pergunta teste',
      questionId: question.id.toValue(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
