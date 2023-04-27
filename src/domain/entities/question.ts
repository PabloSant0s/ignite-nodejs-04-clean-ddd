import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/entities/types/optional"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Slug } from "./value-objects/slug"

interface QuestioProps{
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Question extends Entity<QuestioProps>{
  
  static create(props: Optional<QuestioProps, 'createdAt'>, id?: UniqueEntityID){
    const question = new Question({
      ...props,
      createdAt: props.createdAt ?? new Date()
    },id)

    return question
  }

  public get title() : string {
    return this.props.title
  }
   
  public get slug() : string {
    return this.props.slug.value
  }
  
  public get content() : string {
    return this.props.content
  }

  public get authorId() : UniqueEntityID {
    return this.props.authorId
  }
}