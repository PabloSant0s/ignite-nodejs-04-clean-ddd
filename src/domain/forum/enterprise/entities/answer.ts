import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentsList } from './answer-attachments-list'

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentsList
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentsList(),
      },
      id,
    )

    return answer
  }

  public get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  public get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  public get content(): string {
    return this.props.content
  }

  public get attachments(): AnswerAttachmentsList {
    return this.props.attachments
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  public get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  public set content(content: string) {
    this.props.content = content
    this.touch()
  }

  public set attachments(attachments: AnswerAttachmentsList) {
    this.props.attachments = attachments
    this.touch()
  }
}
