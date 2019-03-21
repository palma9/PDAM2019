import { Substitution } from '.'

let substitution

beforeEach(async () => {
  substitution = await Substitution.create({ date: 'test', schedule: 'test', newTeacher: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = substitution.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(substitution.id)
    expect(view.date).toBe(substitution.date)
    expect(view.schedule).toBe(substitution.schedule)
    expect(view.newTeacher).toBe(substitution.newTeacher)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = substitution.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(substitution.id)
    expect(view.date).toBe(substitution.date)
    expect(view.schedule).toBe(substitution.schedule)
    expect(view.newTeacher).toBe(substitution.newTeacher)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
