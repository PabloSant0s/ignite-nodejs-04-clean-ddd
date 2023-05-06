import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'

import { AnswerQuestionUseCase } from './answer-question'

let answersRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      content: 'Conteudo da Resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(answer.id).toBeTruthy()
    expect(answersRepository.items[0].id).toEqual(answer.id)
  })
})
