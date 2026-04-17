import { vi } from 'vitest'
import { handleCreateRosterPersonnel } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => ({ Authorization: 'Bearer test' })) }))

import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('handleCreateRosterPersonnel', () => {
  it('should call createRosterPersonnel and return the result', async () => {
    const mockResult = { success: true, msg: 'Personnel created', data: { uuid: 'uuid-007', email: 'john.doe@example.com', department: 'Police' as const, createdBy: 'user', createdAt: '2025-01-01', updatedBy: 'user', updatedAt: '2025-01-01' } }
    vi.mocked(AppActions.createRosterPersonnel).mockResolvedValue(mockResult)

    const formData = {
      email: 'john.doe@example.com',
      department: 'Police' as const,
      uuid: 'uuid-007'
    }
    const token = 'test-token'

    const result = await handleCreateRosterPersonnel(formData, token)

    expect(authHeaders).toHaveBeenCalledWith(token)
    expect(AppActions.createRosterPersonnel).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })

  it('should return a failed result when the API call fails', async () => {
    const mockResult = { success: false, msg: 'Server error', data: {} as any }
    vi.mocked(AppActions.createRosterPersonnel).mockResolvedValue(mockResult)

    const formData = {
      email: 'jane.doe@example.com',
      department: 'Fire' as const,
      uuid: 'uuid-008'
    }
    const token = 'test-token'

    const result = await handleCreateRosterPersonnel(formData, token)

    expect(AppActions.createRosterPersonnel).toHaveBeenCalledWith(formData, { Authorization: 'Bearer test' })
    expect(result).toEqual(mockResult)
  })
})
