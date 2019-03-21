import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Substitution } from '.'

const app = () => express(apiRoot, routes)

let userSession, substitution

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  substitution = await Substitution.create({})
})

test('POST /substitutions 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, date: 'test', schedule: 'test', newTeacher: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.schedule).toEqual('test')
  expect(body.newTeacher).toEqual('test')
})

test('POST /substitutions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /substitutions 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /substitutions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /substitutions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${substitution.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(substitution.id)
})

test('GET /substitutions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${substitution.id}`)
  expect(status).toBe(401)
})

test('GET /substitutions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /substitutions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${substitution.id}`)
    .send({ access_token: userSession, date: 'test', schedule: 'test', newTeacher: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(substitution.id)
  expect(body.date).toEqual('test')
  expect(body.schedule).toEqual('test')
  expect(body.newTeacher).toEqual('test')
})

test('PUT /substitutions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${substitution.id}`)
  expect(status).toBe(401)
})

test('PUT /substitutions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, date: 'test', schedule: 'test', newTeacher: 'test' })
  expect(status).toBe(404)
})

test('DELETE /substitutions/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${substitution.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /substitutions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${substitution.id}`)
  expect(status).toBe(401)
})

test('DELETE /substitutions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
