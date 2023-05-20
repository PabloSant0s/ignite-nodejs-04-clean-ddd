import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/entities/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }

  public get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  public get bestAnswerId(): UniqueEntityID | undefined {
    return this.props.bestAnswerId
  }

  public get title(): string {
    return this.props.title
  }

  public get slug(): Slug {
    return this.props.slug
  }

  public get content(): string {
    return this.props.content
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  public get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'days') <= 3
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

  public set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  public set bestAnswerId(answerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = answerId
  }
}
