import { InMemoryQuestionCommentsRepository } from '@test/repositories/in-memory-question-comment-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from '@test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to create a question comment', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    await questionsRepository.create(question)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'Comentario teste',
      questionId: question.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(questionCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
