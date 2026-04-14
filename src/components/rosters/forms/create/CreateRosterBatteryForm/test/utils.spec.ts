import { vi } from 'vitest'
import { handleCreateRosterBattery } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleCreateRosterBattery', () => {
  it('should call createRosterBattery and return the result', async () => {
    const mockResult = { success: true, msg: 'Battery created', data: { uuid: 'uuid-005', registration: 'REG-003', batteryName: 'Battery B', createdBy: 'user', createdAt: '2025-01-01', updatedBy: 'user', updatedAt: '2025-01-01' } }
    vi.mocked(AppActions.createRosterBattery).mockResolvedValue(mockResult)

    const formData = {
      registration: 'REG-003',
      batteryName: 'Battery B',
      uuid: 'uuid-005'
    }
    const token = 'test-token'

    const result = await handleCreateRosterBattery(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.createRosterBattery).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return a failed result when the API call fails', async () => {
    const mockResult = { success: false, msg: 'Server error' }
    vi.mocked(AppActions.createRosterBattery).mockResolvedValue(mockResult)

    const formData = {
      registration: 'REG-004',
      batteryName: 'Battery C',
      uuid: 'uuid-006'
    }
    const token = 'test-token'

    const result = await handleCreateRosterBattery(formData, token)

    expect(AppActions.createRosterBattery).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })
})
