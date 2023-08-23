import { NotificationsRepository } from '../repositories/notifications-repository'
import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface SendNotificationsUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

type SendNotificationsUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    content,
    title,
    recipientId,
  }: SendNotificationsUseCaseRequest): Promise<SendNotificationsUseCaseResponse> {
    const notification = Notification.create({
      title,
      content,
      recipientId: new UniqueEntityID(recipientId),
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
