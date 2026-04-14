import { vi } from 'vitest'
import { handleUpdateBattery } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleUpdateBattery', () => {
  it('should call updateRosterBattery and return the result when _dirtied is true', async () => {
    const mockResult = { success: true, msg: 'Battery updated' }
    vi.mocked(AppActions.updateRosterBattery).mockResolvedValue(mockResult)

    const formData = {
      _dirtied: true,
      registration: 'REG-001',
      batteryName: 'Battery A',
      uuid: 'uuid-001'
    }
    const token = 'test-token'

    const result = await handleUpdateBattery(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.updateRosterBattery).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return { success: true, msg: "No changes to save" } when _dirtied is false', async () => {
    const formData = {
      _dirtied: false,
      registration: 'REG-001',
      batteryName: 'Battery A',
      uuid: 'uuid-001'
    }
    const token = 'test-token'

    const result = await handleUpdateBattery(formData, token)

    expect(AppActions.updateRosterBattery).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, msg: 'No changes to save' })
  })

  it('should return { success: true, msg: "No changes to save" } when _dirtied is undefined', async () => {
    const formData = {
      registration: 'REG-001',
      batteryName: 'Battery A',
      uuid: 'uuid-001'
    }
    const token = 'test-token'

    const result = await handleUpdateBattery(formData, token)

    expect(AppActions.updateRosterBattery).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, msg: 'No changes to save' })
  })
})
