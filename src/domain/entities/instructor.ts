import { Entity } from "../../core/entities/entity"

interface InstructorProps{
  name: string
}
export class Instructor extends Entity<InstructorProps>{
  
  public get name() : string {
    return this.props.name
  }
  
}