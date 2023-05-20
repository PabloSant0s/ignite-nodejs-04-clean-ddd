import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-uestion-best-answer'
import { makeQuestion } from '@test/factories/make-question'
import { makeAnswer } from '@test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionRepository: InMemoryQuestionsRepository
let answerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    answerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      questionRepository,
      answerRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(questionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    const answer = makeAnswer({ questionId: question.id })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    await expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
