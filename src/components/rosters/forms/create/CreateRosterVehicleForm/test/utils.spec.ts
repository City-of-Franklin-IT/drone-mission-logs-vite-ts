import { vi } from 'vitest'
import { handleCreateRosterVehicle } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleCreateRosterVehicle', () => {
  it('should call createRosterVehicle and return the result', async () => {
    const mockResult = { success: true, msg: 'Vehicle created', data: { uuid: 'uuid-009', model: 'Model Y', registration: 'REG-005', department: 'Police' as const, createdBy: 'user', createdAt: '2025-01-01', updatedBy: 'user', updatedAt: '2025-01-01' } }
    vi.mocked(AppActions.createRosterVehicle).mockResolvedValue(mockResult)

    const formData = {
      model: 'Model Y',
      registration: 'REG-005',
      department: 'Police' as const,
      uuid: 'uuid-009'
    }
    const token = 'test-token'

    const result = await handleCreateRosterVehicle(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.createRosterVehicle).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return a failed result when the API call fails', async () => {
    const mockResult = { success: false, msg: 'Server error' }
    vi.mocked(AppActions.createRosterVehicle).mockResolvedValue(mockResult)

    const formData = {
      model: 'Model Z',
      registration: 'REG-006',
      department: 'Fire' as const,
      uuid: 'uuid-010'
    }
    const token = 'test-token'

    const result = await handleCreateRosterVehicle(formData, token)

    expect(AppActions.createRosterVehicle).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })
})
