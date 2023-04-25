import { Entity } from "../../core/entities/entity"

interface AnswerProps{
  content: string
  authorId: string
  questionId: string
}
export class Answer extends Entity<AnswerProps>{
  
  public get content() : string {
    return this.props.content
  }
    
  public get authorId() : string {
    return this.props.authorId
  }

  
  public get questionId() : string {
    return this.props.questionId
  }
  
  
}