import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Owner } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, owner

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  owner = await Owner.create({})
})

test('POST /owners 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, transferdate: 'test', description: 'test', sender: 'test', receiver: 'test', level1approver: 'test', level2approver: 'test', level1status: 'test', level2status: 'test', overallstatus: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.transferdate).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.sender).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.level1approver).toEqual('test')
  expect(body.level2approver).toEqual('test')
  expect(body.level1status).toEqual('test')
  expect(body.level2status).toEqual('test')
  expect(body.overallstatus).toEqual('test')
})

test('POST /owners 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /owners 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /owners 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /owners 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /owners 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /owners/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${owner.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(owner.id)
})

test('GET /owners/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${owner.id}`)
  expect(status).toBe(401)
})

test('GET /owners/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /owners/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${owner.id}`)
    .send({ access_token: masterKey, transferdate: 'test', description: 'test', sender: 'test', receiver: 'test', level1approver: 'test', level2approver: 'test', level1status: 'test', level2status: 'test', overallstatus: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(owner.id)
  expect(body.transferdate).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.sender).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.level1approver).toEqual('test')
  expect(body.level2approver).toEqual('test')
  expect(body.level1status).toEqual('test')
  expect(body.level2status).toEqual('test')
  expect(body.overallstatus).toEqual('test')
})

test('PUT /owners/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${owner.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /owners/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${owner.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /owners/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${owner.id}`)
  expect(status).toBe(401)
})

test('PUT /owners/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, transferdate: 'test', description: 'test', sender: 'test', receiver: 'test', level1approver: 'test', level2approver: 'test', level1status: 'test', level2status: 'test', overallstatus: 'test' })
  expect(status).toBe(404)
})

test('DELETE /owners/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${owner.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /owners/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${owner.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /owners/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${owner.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /owners/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${owner.id}`)
  expect(status).toBe(401)
})

test('DELETE /owners/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
