import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Invoice } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, invoice

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  invoice = await Invoice.create({})
})

test('POST /invoices 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, date: 'test', description: 'test', amount: 'test', currency: 'test', status: 'test', nft: 'test', receiver: 'test', issuer: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.nft).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.issuer).toEqual('test')
})

test('POST /invoices 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /invoices 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /invoices 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /invoices 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /invoices 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
})

test('GET /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /invoices/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /invoices/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: masterKey, date: 'test', description: 'test', amount: 'test', currency: 'test', status: 'test', nft: 'test', receiver: 'test', issuer: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.nft).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.issuer).toEqual('test')
})

test('PUT /invoices/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /invoices/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('PUT /invoices/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, date: 'test', description: 'test', amount: 'test', currency: 'test', status: 'test', nft: 'test', receiver: 'test', issuer: 'test' })
  expect(status).toBe(404)
})

test('DELETE /invoices/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /invoices/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
