import { School } from '.'

let school

beforeEach(async () => {
  school = await School.create({ name: 'test', subscriptionEnd: 'test', contact: 'test', address: 'test', city: 'test', country: 'test', location: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = school.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(school.id)
    expect(view.name).toBe(school.name)
    expect(view.subscriptionEnd).toBe(school.subscriptionEnd)
    expect(view.contact).toBe(school.contact)
    expect(view.address).toBe(school.address)
    expect(view.city).toBe(school.city)
    expect(view.country).toBe(school.country)
    expect(view.location).toBe(school.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = school.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(school.id)
    expect(view.name).toBe(school.name)
    expect(view.subscriptionEnd).toBe(school.subscriptionEnd)
    expect(view.contact).toBe(school.contact)
    expect(view.address).toBe(school.address)
    expect(view.city).toBe(school.city)
    expect(view.country).toBe(school.country)
    expect(view.location).toBe(school.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
