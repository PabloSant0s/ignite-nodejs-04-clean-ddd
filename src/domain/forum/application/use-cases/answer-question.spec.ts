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
    const result = await sut.execute({
      content: 'Conteudo da Resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.items[0]).toEqual(result.value?.answer)
  })
})
