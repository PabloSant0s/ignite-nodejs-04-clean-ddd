import { Entity } from "../../core/entities/entity"
import { Slug } from "./value-objects/slug"

interface QuestioProps{
  title: string
  slug: Slug
  content: string
  authorId: string
}
export class Question extends Entity<QuestioProps>{
  
  public get title() : string {
    return this.props.title
  }
   
  public get slug() : string {
    return this.props.slug.value
  }
  
  public get content() : string {
    return this.props.content
  }

  public get authorId() : string {
    return this.props.authorId
  }
}