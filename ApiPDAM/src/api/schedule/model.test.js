import { Schedule } from '.'

let schedule

beforeEach(async () => {
  schedule = await Schedule.create({ startTime: 'test', endTime: 'test', dayOfWeek: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = schedule.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(schedule.id)
    expect(view.startTime).toBe(schedule.startTime)
    expect(view.endTime).toBe(schedule.endTime)
    expect(view.dayOfWeek).toBe(schedule.dayOfWeek)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = schedule.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(schedule.id)
    expect(view.startTime).toBe(schedule.startTime)
    expect(view.endTime).toBe(schedule.endTime)
    expect(view.dayOfWeek).toBe(schedule.dayOfWeek)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
