import { Grade } from '.'

let grade

beforeEach(async () => {
  grade = await Grade.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = grade.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(grade.id)
    expect(view.name).toBe(grade.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = grade.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(grade.id)
    expect(view.name).toBe(grade.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
