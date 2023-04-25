import { randomUUID } from "crypto"
import { Entity } from "../../core/entities/entity"

interface StudentProps{
  name: string
}
export class Student extends Entity<StudentProps>{
  
  public get name() : string {
    return this.props.name
  }
  
}