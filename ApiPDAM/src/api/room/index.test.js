import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Room } from '.'

const app = () => express(apiRoot, routes)

let userSession, room

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  room = await Room.create({})
})

test('POST /rooms 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, classNumber: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.classNumber).toEqual('test')
})

test('POST /rooms 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rooms 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /rooms 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rooms/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${room.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(room.id)
})

test('GET /rooms/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${room.id}`)
  expect(status).toBe(401)
})

test('GET /rooms/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /rooms/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${room.id}`)
    .send({ access_token: userSession, classNumber: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(room.id)
  expect(body.classNumber).toEqual('test')
})

test('PUT /rooms/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${room.id}`)
  expect(status).toBe(401)
})

test('PUT /rooms/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, classNumber: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rooms/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${room.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /rooms/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${room.id}`)
  expect(status).toBe(401)
})

test('DELETE /rooms/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
