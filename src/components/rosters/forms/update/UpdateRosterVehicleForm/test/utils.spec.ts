import { vi } from 'vitest'
import { handleUpdateVehicle } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleUpdateVehicle', () => {
  it('should call updateRosterVehicle and return the result when _dirtied is true', async () => {
    const mockResult = { success: true, msg: 'Vehicle updated' }
    vi.mocked(AppActions.updateRosterVehicle).mockResolvedValue(mockResult)

    const formData = {
      _dirtied: true,
      model: 'Model X',
      registration: 'REG-002',
      department: 'Police' as const,
      uuid: 'uuid-002'
    }
    const token = 'test-token'

    const result = await handleUpdateVehicle(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.updateRosterVehicle).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return { success: true, msg: "No changes to save" } when _dirtied is false', async () => {
    const formData = {
      _dirtied: false,
      model: 'Model X',
      registration: 'REG-002',
      department: 'Police' as const,
      uuid: 'uuid-002'
    }
    const token = 'test-token'

    const result = await handleUpdateVehicle(formData, token)

    expect(AppActions.updateRosterVehicle).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, msg: 'No changes to save' })
  })

  it('should return { success: true, msg: "No changes to save" } when _dirtied is undefined', async () => {
    const formData = {
      model: 'Model X',
      registration: 'REG-002',
      department: 'Police' as const,
      uuid: 'uuid-002'
    }
    const token = 'test-token'

    const result = await handleUpdateVehicle(formData, token)

    expect(AppActions.updateRosterVehicle).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, msg: 'No changes to save' })
  })
})
