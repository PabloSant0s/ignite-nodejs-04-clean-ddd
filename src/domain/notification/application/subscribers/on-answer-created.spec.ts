import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { OnAnswerCreated } from './on-answer-created'

let answersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswerRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    answersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswerRepository(
      answersAttachmentsRepository,
    )
  })

  it('should send a notification when an answer is created', () => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer({})

    answersRepository.create(answer)
  })
})
