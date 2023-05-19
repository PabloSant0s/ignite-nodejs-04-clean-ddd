import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not alowed.')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)
    return {}
  }
}
