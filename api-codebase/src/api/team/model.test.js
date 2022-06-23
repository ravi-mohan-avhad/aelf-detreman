import { Team } from '.'

let team

beforeEach(async () => {
  team = await Team.create({ name: 'test', status: 'test', teamleader: 'test', manager: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = team.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(view.name).toBe(team.name)
    expect(view.status).toBe(team.status)
    expect(view.teamleader).toBe(team.teamleader)
    expect(view.manager).toBe(team.manager)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = team.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(view.name).toBe(team.name)
    expect(view.status).toBe(team.status)
    expect(view.teamleader).toBe(team.teamleader)
    expect(view.manager).toBe(team.manager)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
