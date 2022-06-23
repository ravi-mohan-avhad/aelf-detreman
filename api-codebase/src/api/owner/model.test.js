import { Owner } from '.'

let owner

beforeEach(async () => {
  owner = await Owner.create({ transferdate: 'test', description: 'test', sender: 'test', receiver: 'test', level1approver: 'test', level2approver: 'test', level1status: 'test', level2status: 'test', overallstatus: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = owner.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(owner.id)
    expect(view.transferdate).toBe(owner.transferdate)
    expect(view.description).toBe(owner.description)
    expect(view.sender).toBe(owner.sender)
    expect(view.receiver).toBe(owner.receiver)
    expect(view.level1approver).toBe(owner.level1approver)
    expect(view.level2approver).toBe(owner.level2approver)
    expect(view.level1status).toBe(owner.level1status)
    expect(view.level2status).toBe(owner.level2status)
    expect(view.overallstatus).toBe(owner.overallstatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = owner.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(owner.id)
    expect(view.transferdate).toBe(owner.transferdate)
    expect(view.description).toBe(owner.description)
    expect(view.sender).toBe(owner.sender)
    expect(view.receiver).toBe(owner.receiver)
    expect(view.level1approver).toBe(owner.level1approver)
    expect(view.level2approver).toBe(owner.level2approver)
    expect(view.level1status).toBe(owner.level1status)
    expect(view.level2status).toBe(owner.level2status)
    expect(view.overallstatus).toBe(owner.overallstatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
