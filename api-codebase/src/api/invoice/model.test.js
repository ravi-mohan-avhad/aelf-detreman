import { Invoice } from '.'

let invoice

beforeEach(async () => {
  invoice = await Invoice.create({ date: 'test', description: 'test', amount: 'test', currency: 'test', status: 'test', nft: 'test', receiver: 'test', issuer: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.date).toBe(invoice.date)
    expect(view.description).toBe(invoice.description)
    expect(view.amount).toBe(invoice.amount)
    expect(view.currency).toBe(invoice.currency)
    expect(view.status).toBe(invoice.status)
    expect(view.nft).toBe(invoice.nft)
    expect(view.receiver).toBe(invoice.receiver)
    expect(view.issuer).toBe(invoice.issuer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.date).toBe(invoice.date)
    expect(view.description).toBe(invoice.description)
    expect(view.amount).toBe(invoice.amount)
    expect(view.currency).toBe(invoice.currency)
    expect(view.status).toBe(invoice.status)
    expect(view.nft).toBe(invoice.nft)
    expect(view.receiver).toBe(invoice.receiver)
    expect(view.issuer).toBe(invoice.issuer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
