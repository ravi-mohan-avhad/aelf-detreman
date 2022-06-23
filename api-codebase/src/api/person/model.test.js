import { Person } from '.'

let person

beforeEach(async () => {
  person = await Person.create({ name: 'test', age: 'test', email: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', walletaddress: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = person.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(view.name).toBe(person.name)
    expect(view.age).toBe(person.age)
    expect(view.email).toBe(person.email)
    expect(view.address).toBe(person.address)
    expect(view.contactnumber).toBe(person.contactnumber)
    expect(view.startdate).toBe(person.startdate)
    expect(view.status).toBe(person.status)
    expect(view.walletaddress).toBe(person.walletaddress)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = person.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(view.name).toBe(person.name)
    expect(view.age).toBe(person.age)
    expect(view.email).toBe(person.email)
    expect(view.address).toBe(person.address)
    expect(view.contactnumber).toBe(person.contactnumber)
    expect(view.startdate).toBe(person.startdate)
    expect(view.status).toBe(person.status)
    expect(view.walletaddress).toBe(person.walletaddress)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
