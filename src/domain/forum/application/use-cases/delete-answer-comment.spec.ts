import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comment-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from '@test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(answerCommentRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1'),
    )
    await answerCommentRepository.create(answerComment)

    await sut.execute({
      answerCommentId: 'answer-comment-1',
      authorId: 'author-1',
    })

    expect(answerCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const answerComment = makeAnswerComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-comment-1'),
    )

    await answerCommentRepository.create(answerComment)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerCommentId: 'answer-comment-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
