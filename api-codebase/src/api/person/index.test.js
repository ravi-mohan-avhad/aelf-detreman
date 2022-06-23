import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Person } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, person

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  person = await Person.create({})
})

test('POST /people 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', email: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', walletaddress: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.contactnumber).toEqual('test')
  expect(body.startdate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.walletaddress).toEqual('test')
})

test('POST /people 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /people 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /people 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /people 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /people 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /people 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /people/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${person.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
})

test('GET /people/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${person.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /people/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${person.id}`)
  expect(status).toBe(401)
})

test('GET /people/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /people/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${person.id}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', email: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', walletaddress: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.contactnumber).toEqual('test')
  expect(body.startdate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.walletaddress).toEqual('test')
})

test('PUT /people/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${person.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /people/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${person.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /people/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${person.id}`)
  expect(status).toBe(401)
})

test('PUT /people/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', age: 'test', email: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', walletaddress: 'test' })
  expect(status).toBe(404)
})

test('DELETE /people/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /people/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /people/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /people/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
  expect(status).toBe(401)
})

test('DELETE /people/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
