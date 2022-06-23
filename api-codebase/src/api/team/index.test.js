import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Team } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, team

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  team = await Team.create({})
})

test('POST /teams 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', status: 'test', teamleader: 'test', manager: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.teamleader).toEqual('test')
  expect(body.manager).toEqual('test')
})

test('POST /teams 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /teams 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /teams 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teams 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /teams 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /teams 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teams/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${team.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
})

test('GET /teams/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${team.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /teams/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${team.id}`)
  expect(status).toBe(401)
})

test('GET /teams/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /teams/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${team.id}`)
    .send({ access_token: masterKey, name: 'test', status: 'test', teamleader: 'test', manager: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.teamleader).toEqual('test')
  expect(body.manager).toEqual('test')
})

test('PUT /teams/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${team.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /teams/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${team.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /teams/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${team.id}`)
  expect(status).toBe(401)
})

test('PUT /teams/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', status: 'test', teamleader: 'test', manager: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teams/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${team.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /teams/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${team.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /teams/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${team.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /teams/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${team.id}`)
  expect(status).toBe(401)
})

test('DELETE /teams/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
