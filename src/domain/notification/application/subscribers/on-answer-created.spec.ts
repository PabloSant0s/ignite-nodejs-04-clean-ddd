import { makeAnswer } from '@test/factories/make-answer'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { waitFor } from '@test/utils/wait-for'
import { SpyInstance } from 'vitest'
import {
  SendNotificationUseCase,
  SendNotificationsUseCaseRequest,
} from '../use-cases/send-notification'
import { SendNotificationsUseCaseResponse } from './../use-cases/send-notification'
import { OnAnswerCreated } from './on-answer-created'

let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let questionsRepository: InMemoryQuestionsRepository
let answersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswerRepository
let notificationsRepository: InMemoryNotificationsRepository

let sendNotificationUseCase: SendNotificationUseCase
let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationsUseCaseRequest],
  Promise<SendNotificationsUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    answersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswerRepository(
      answersAttachmentsRepository,
    )
    notificationsRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(questionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionsRepository.create(question)
    answersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
