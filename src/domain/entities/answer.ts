import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface AnswerProps{
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerProps>{
  
  public get content() : string {
    return this.props.content
  }
    
  public get authorId() : UniqueEntityID{
    return this.props.authorId
  }

  
  public get questionId() : UniqueEntityID{
    return this.props.questionId
  }
  
  
}