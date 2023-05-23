import { InMemoryQuestionCommentsRepository } from '@test/repositories/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from '@test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(questionCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-comment-1'),
    )
    await questionCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: 'question-comment-1',
      authorId: 'author-1',
    })

    expect(questionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const questionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-comment-1'),
    )

    await questionCommentRepository.create(questionComment)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionCommentId: 'question-comment-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})