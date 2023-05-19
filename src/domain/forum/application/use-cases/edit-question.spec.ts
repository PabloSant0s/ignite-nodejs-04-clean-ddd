import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'Conteudo teste',
        title: 'Pergunta teste',
        questionId: question.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
