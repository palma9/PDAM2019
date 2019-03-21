import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Grade } from '.'

const app = () => express(apiRoot, routes)

let userSession, grade

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  grade = await Grade.create({})
})

test('POST /grades 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /grades 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /grades 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /grades 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /grades/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${grade.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(grade.id)
})

test('GET /grades/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${grade.id}`)
  expect(status).toBe(401)
})

test('GET /grades/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /grades/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${grade.id}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(grade.id)
  expect(body.name).toEqual('test')
})

test('PUT /grades/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${grade.id}`)
  expect(status).toBe(401)
})

test('PUT /grades/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /grades/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${grade.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /grades/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${grade.id}`)
  expect(status).toBe(401)
})

test('DELETE /grades/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
