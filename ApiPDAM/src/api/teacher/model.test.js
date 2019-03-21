import { Teacher } from '.'

let teacher

beforeEach(async () => {
  teacher = await Teacher.create({ number: 'test', email: 'test', substitutionsDone: 'test', substituted: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = teacher.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teacher.id)
    expect(view.number).toBe(teacher.number)
    expect(view.email).toBe(teacher.email)
    expect(view.substitutionsDone).toBe(teacher.substitutionsDone)
    expect(view.substituted).toBe(teacher.substituted)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = teacher.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teacher.id)
    expect(view.number).toBe(teacher.number)
    expect(view.email).toBe(teacher.email)
    expect(view.substitutionsDone).toBe(teacher.substitutionsDone)
    expect(view.substituted).toBe(teacher.substituted)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
