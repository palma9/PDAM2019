import { Subject } from '.'

let subject

beforeEach(async () => {
  subject = await Subject.create({ name: 'test', weeklyhours: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = subject.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(subject.id)
    expect(view.name).toBe(subject.name)
    expect(view.weeklyhours).toBe(subject.weeklyhours)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = subject.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(subject.id)
    expect(view.name).toBe(subject.name)
    expect(view.weeklyhours).toBe(subject.weeklyhours)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
