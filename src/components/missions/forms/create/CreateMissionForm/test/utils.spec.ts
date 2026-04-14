import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as AppActions from '@/context/App/AppActions'
import { handleCreateMission } from '../utils'

vi.mock('@/context/App/AppActions')
vi.mock('@/helpers/utils', () => ({ authHeaders: vi.fn(() => new Headers({ Authorization: 'Bearer test' })) }))

const baseFormData = {
  missionDate: '2025-06-15',
  missionDescription: 'Test',
  location: 'Franklin',
  department: 'Fire' as const,
  incidentNumber: null
}

const mockSuccess = { success: true, data: { uuid: 'mission-uuid' } }
const mockNestedSuccess = { success: true, data: {} }

beforeEach(() => vi.clearAllMocks())

describe('handleCreateMission', () => {
  it('returns the result of createMission on success with no nested data', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)

    const result = await handleCreateMission(baseFormData as any, 'test-token')

    expect(result).toEqual(mockSuccess)
    expect(AppActions.createMission).toHaveBeenCalledTimes(1)
    expect(AppActions.createFlight).not.toHaveBeenCalled()
    expect(AppActions.createPersonnel).not.toHaveBeenCalled()
    expect(AppActions.createWeather).not.toHaveBeenCalled()
    expect(AppActions.createVehicle).not.toHaveBeenCalled()
    expect(AppActions.createTFR).not.toHaveBeenCalled()
    expect(AppActions.createResponseOnly).not.toHaveBeenCalled()
  })

  it('returns the failure result and makes no other calls when createMission fails', async () => {
    const failResult = { success: false, msg: 'Error', data: {} }
    vi.mocked(AppActions.createMission).mockResolvedValue(failResult as any)

    const result = await handleCreateMission(baseFormData as any, 'test-token')

    expect(result).toEqual(failResult)
    expect(AppActions.createFlight).not.toHaveBeenCalled()
    expect(AppActions.createPersonnel).not.toHaveBeenCalled()
    expect(AppActions.createWeather).not.toHaveBeenCalled()
    expect(AppActions.createVehicle).not.toHaveBeenCalled()
    expect(AppActions.createTFR).not.toHaveBeenCalled()
    expect(AppActions.createResponseOnly).not.toHaveBeenCalled()
  })

  it('calls createResponseOnly and createPersonnel (for personnel with email) when ResponseOnly._checked is true', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createResponseOnly).mockResolvedValue(mockNestedSuccess as any)
    vi.mocked(AppActions.createPersonnel).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      ResponseOnly: { _checked: true },
      Personnel: [
        { email: 'pilot@test.com', isPilot: true },
        { email: '', isPilot: false }
      ]
    }

    const result = await handleCreateMission(formData as any, 'test-token')

    expect(result).toEqual(mockSuccess)
    expect(AppActions.createResponseOnly).toHaveBeenCalledWith(
      { parentId: 'mission-uuid' },
      expect.any(Headers)
    )
    expect(AppActions.createPersonnel).toHaveBeenCalledTimes(1)
    expect(AppActions.createPersonnel).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'pilot@test.com', parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
    // ResponseOnly branch returns early — no flights, weather, tfr, vehicle calls
    expect(AppActions.createFlight).not.toHaveBeenCalled()
    expect(AppActions.createWeather).not.toHaveBeenCalled()
    expect(AppActions.createTFR).not.toHaveBeenCalled()
    expect(AppActions.createVehicle).not.toHaveBeenCalled()
  })

  it('calls createVehicle then createBattery when Vehicle has a registration and batteries', async () => {
    const vehicleSuccess = { success: true, data: { uuid: 'vehicle-uuid' } }
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createVehicle).mockResolvedValue(vehicleSuccess as any)
    vi.mocked(AppActions.createBattery).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      Vehicle: {
        registration: 'ABC',
        Batteries: [
          { batteryName: 'Bat1' },
          { batteryName: '' }
        ]
      }
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createVehicle).toHaveBeenCalledWith(
      expect.objectContaining({ registration: 'ABC', parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
    expect(AppActions.createBattery).toHaveBeenCalledTimes(1)
    expect(AppActions.createBattery).toHaveBeenCalledWith(
      expect.objectContaining({ batteryName: 'Bat1', parentId: 'vehicle-uuid' }),
      expect.any(Headers)
    )
  })

  it('does not call createBattery when createVehicle fails', async () => {
    const vehicleFailure = { success: false, data: {}, msg: 'Vehicle error' }
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createVehicle).mockResolvedValue(vehicleFailure as any)
    vi.mocked(AppActions.createBattery).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      Vehicle: {
        registration: 'ABC',
        Batteries: [{ batteryName: 'Bat1' }]
      }
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createVehicle).toHaveBeenCalledTimes(1)
    expect(AppActions.createBattery).not.toHaveBeenCalled()
  })

  it('calls createFlight for flights with both takeOffDateTime and landingDateTime', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createFlight).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      Flights: [
        { takeOffDateTime: '2025-06-15T10:00', landingDateTime: '2025-06-15T11:00' },
        { takeOffDateTime: '', landingDateTime: '2025-06-15T11:00' }
      ]
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createFlight).toHaveBeenCalledTimes(1)
    expect(AppActions.createFlight).toHaveBeenCalledWith(
      expect.objectContaining({ parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
  })

  it('calls createPersonnel for personnel with an email', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createPersonnel).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      Personnel: [
        { email: 'test@test.com', isPilot: true },
        { email: null, isPilot: false }
      ]
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createPersonnel).toHaveBeenCalledTimes(1)
    expect(AppActions.createPersonnel).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@test.com', isPilot: true, parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
  })

  it('calls createWeather when Weather is provided', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createWeather).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      Weather: { visibility: 'clear', temperature: 75 }
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createWeather).toHaveBeenCalledTimes(1)
    expect(AppActions.createWeather).toHaveBeenCalledWith(
      expect.objectContaining({ visibility: 'clear', temperature: 75, parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
  })

  it('calls createTFR when TemporaryFlightRestriction is provided', async () => {
    vi.mocked(AppActions.createMission).mockResolvedValue(mockSuccess as any)
    vi.mocked(AppActions.createTFR).mockResolvedValue(mockNestedSuccess as any)

    const formData = {
      ...baseFormData,
      TemporaryFlightRestriction: { temporaryFlightRestriction: 'TFR123', source: 'FAA' }
    }

    await handleCreateMission(formData as any, 'test-token')

    expect(AppActions.createTFR).toHaveBeenCalledTimes(1)
    expect(AppActions.createTFR).toHaveBeenCalledWith(
      expect.objectContaining({ temporaryFlightRestriction: 'TFR123', source: 'FAA', parentId: 'mission-uuid' }),
      expect.any(Headers)
    )
  })
})
