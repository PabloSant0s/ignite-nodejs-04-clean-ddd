import { randomUUID } from "crypto"
import { Slug } from "./value-objects/slug"

interface QuestioProps{
  title: string
  slug: Slug
  content: string
  authorId: string
}
export class Question{
  public id: string
  public title: string
  public slug: Slug
  public content: string
  public authorId: string

  constructor(props: QuestioProps, id?: string){
    this.title = props.title
    this.content = props.content
    this.slug = props.slug
    this.authorId = props.authorId
    this.id = id ?? randomUUID()
  }
}