import { vi } from 'vitest'
import { handleUpdatePersonnel } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleUpdatePersonnel', () => {
  it('should call updateRosterPersonnel and return the result', async () => {
    const mockResult = { success: true, msg: 'Personnel updated' }
    vi.mocked(AppActions.updateRosterPersonnel).mockResolvedValue(mockResult)

    const formData = {
      email: 'john.doe@example.com',
      department: 'Police' as const,
      uuid: 'uuid-003'
    }
    const token = 'test-token'

    const result = await handleUpdatePersonnel(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.updateRosterPersonnel).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return a failed result when the API call fails', async () => {
    const mockResult = { success: false, msg: 'Server error' }
    vi.mocked(AppActions.updateRosterPersonnel).mockResolvedValue(mockResult)

    const formData = {
      email: 'jane.doe@example.com',
      department: 'Fire' as const,
      uuid: 'uuid-004'
    }
    const token = 'test-token'

    const result = await handleUpdatePersonnel(formData, token)

    expect(AppActions.updateRosterPersonnel).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })
})
