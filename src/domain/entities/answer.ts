import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/entities/types/optional"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface AnswerProps{
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerProps>{

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID){
    const answer = new Answer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return answer
  }
  
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