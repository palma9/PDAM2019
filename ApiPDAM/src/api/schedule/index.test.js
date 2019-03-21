import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Schedule } from '.'

const app = () => express(apiRoot, routes)

let userSession, schedule

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  schedule = await Schedule.create({})
})

test('POST /schedules 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, startTime: 'test', endTime: 'test', dayOfWeek: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.startTime).toEqual('test')
  expect(body.endTime).toEqual('test')
  expect(body.dayOfWeek).toEqual('test')
})

test('POST /schedules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /schedules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /schedules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /schedules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${schedule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(schedule.id)
})

test('GET /schedules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${schedule.id}`)
  expect(status).toBe(401)
})

test('GET /schedules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /schedules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${schedule.id}`)
    .send({ access_token: userSession, startTime: 'test', endTime: 'test', dayOfWeek: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(schedule.id)
  expect(body.startTime).toEqual('test')
  expect(body.endTime).toEqual('test')
  expect(body.dayOfWeek).toEqual('test')
})

test('PUT /schedules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${schedule.id}`)
  expect(status).toBe(401)
})

test('PUT /schedules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, startTime: 'test', endTime: 'test', dayOfWeek: 'test' })
  expect(status).toBe(404)
})

test('DELETE /schedules/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${schedule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /schedules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${schedule.id}`)
  expect(status).toBe(401)
})

test('DELETE /schedules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
