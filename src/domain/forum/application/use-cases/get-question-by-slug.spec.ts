import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to get a question by slug', async () => {
    questionRepository.create(
      Question.create({
        authorId: new UniqueEntityID('1'),
        title: 'Example Question',
        content: 'Example content',
        slug: Slug.create('example-slug'),
      }),
    )
    const { question } = await sut.execute({ slug: 'example-slug' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Example Question')
  })
})
