import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Subject } from '.'

const app = () => express(apiRoot, routes)

let userSession, subject

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  subject = await Subject.create({})
})

test('POST /subjects 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', weeklyhours: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.weeklyhours).toEqual('test')
})

test('POST /subjects 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /subjects 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /subjects 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /subjects/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${subject.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(subject.id)
})

test('GET /subjects/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${subject.id}`)
  expect(status).toBe(401)
})

test('GET /subjects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /subjects/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${subject.id}`)
    .send({ access_token: userSession, name: 'test', weeklyhours: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(subject.id)
  expect(body.name).toEqual('test')
  expect(body.weeklyhours).toEqual('test')
})

test('PUT /subjects/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${subject.id}`)
  expect(status).toBe(401)
})

test('PUT /subjects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', weeklyhours: 'test' })
  expect(status).toBe(404)
})

test('DELETE /subjects/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${subject.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /subjects/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${subject.id}`)
  expect(status).toBe(401)
})

test('DELETE /subjects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
