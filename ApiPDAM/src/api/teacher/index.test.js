import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Teacher } from '.'

const app = () => express(apiRoot, routes)

let userSession, teacher

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  teacher = await Teacher.create({})
})

test('POST /teachers 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, number: 'test', email: 'test', substitutionsDone: 'test', substituted: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.number).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.substitutionsDone).toEqual('test')
  expect(body.substituted).toEqual('test')
})

test('POST /teachers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teachers 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /teachers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teachers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${teacher.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teacher.id)
})

test('GET /teachers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${teacher.id}`)
  expect(status).toBe(401)
})

test('GET /teachers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /teachers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${teacher.id}`)
    .send({ access_token: userSession, number: 'test', email: 'test', substitutionsDone: 'test', substituted: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teacher.id)
  expect(body.number).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.substitutionsDone).toEqual('test')
  expect(body.substituted).toEqual('test')
})

test('PUT /teachers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${teacher.id}`)
  expect(status).toBe(401)
})

test('PUT /teachers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, number: 'test', email: 'test', substitutionsDone: 'test', substituted: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teachers/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teacher.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /teachers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teacher.id}`)
  expect(status).toBe(401)
})

test('DELETE /teachers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
