import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let questionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-slug'),
    })

    await questionRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'example-slug' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Example Question')
  })
})
