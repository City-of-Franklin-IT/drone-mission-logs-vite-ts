import { vi, beforeEach } from "vitest"
import { utcToLocalDatetime, handleUpdateMission } from "../utils"

vi.mock("@/context/App/AppActions", () => ({
  updateMission: vi.fn().mockResolvedValue({ success: true }),
  createResponseOnly: vi.fn().mockResolvedValue({ success: true }),
  deleteResponseOnly: vi.fn().mockResolvedValue({ success: true }),
  updateVehicle: vi.fn().mockResolvedValue({ success: true }),
  updateInspection: vi.fn().mockResolvedValue({ success: true }),
  updateWeather: vi.fn().mockResolvedValue({ success: true }),
  deleteTFR: vi.fn().mockResolvedValue({ success: true }),
  updateTFR: vi.fn().mockResolvedValue({ success: true }),
  createTFR: vi.fn().mockResolvedValue({ success: true }),
  deletePersonnel: vi.fn().mockResolvedValue({ success: true }),
  updatePersonnel: vi.fn().mockResolvedValue({ success: true }),
  createPersonnel: vi.fn().mockResolvedValue({ success: true }),
  deleteFlight: vi.fn().mockResolvedValue({ success: true }),
  updateFlight: vi.fn().mockResolvedValue({ success: true }),
  createFlight: vi.fn().mockResolvedValue({ success: true }),
  deleteBattery: vi.fn().mockResolvedValue({ success: true }),
  updateBattery: vi.fn().mockResolvedValue({ success: true }),
  createBattery: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock("@/helpers/utils", () => ({
  authHeaders: vi.fn().mockReturnValue(new Headers()),
}))

import * as AppActions from "@/context/App/AppActions"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("utcToLocalDatetime", () => {
  it("should return a string of exactly 16 characters", () => {
    const result = utcToLocalDatetime("2025-01-15T18:00:00.000Z")
    expect(result).toHaveLength(16)
  })

  it("should not end with 'Z'", () => {
    const result = utcToLocalDatetime("2025-01-15T18:00:00.000Z")
    expect(result.endsWith("Z")).toBe(false)
  })

  it("should match the datetime-local input format YYYY-MM-DDTHH:MM", () => {
    const result = utcToLocalDatetime("2025-06-20T12:30:00.000Z")
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
  })

  it("should return a string that can be parsed back to a valid Date", () => {
    const result = utcToLocalDatetime("2025-03-05T09:00:00.000Z")
    const reparsed = new Date(result)
    expect(isNaN(reparsed.getTime())).toBe(false)
  })
})

describe("handleUpdateMission", () => {
  const token = "test-token"

  const baseFormData = {
    missionDate: "2025-01-15",
    department: undefined,
    incidentNumber: null,
    missionDescription: "Test mission",
    location: "Test location",
  }

  it("should always return { success: true, msg: 'Mission Updated' }", async () => {
    const result = await handleUpdateMission({ ...baseFormData, _dirtied: false }, token)
    expect(result).toEqual({ success: true, msg: "Mission Updated" })
  })

  it("should call updateMission when _dirtied is true", async () => {
    await handleUpdateMission({ ...baseFormData, _dirtied: true }, token)
    expect(AppActions.updateMission).toHaveBeenCalledTimes(1)
  })

  it("should not call updateMission when _dirtied is false", async () => {
    await handleUpdateMission({ ...baseFormData, _dirtied: false }, token)
    expect(AppActions.updateMission).not.toHaveBeenCalled()
  })

  it("should not call updateMission when _dirtied is undefined", async () => {
    await handleUpdateMission({ ...baseFormData }, token)
    expect(AppActions.updateMission).not.toHaveBeenCalled()
  })

  it("should call createResponseOnly when ResponseOnly._dirtied && _checked && !uuid", async () => {
    await handleUpdateMission({
      ...baseFormData,
      uuid: "mission-uuid-1",
      ResponseOnly: { _dirtied: true, _checked: true, uuid: undefined, parentId: "mission-uuid-1" },
    }, token)
    expect(AppActions.createResponseOnly).toHaveBeenCalledTimes(1)
    expect(AppActions.deleteResponseOnly).not.toHaveBeenCalled()
  })

  it("should call deleteResponseOnly when ResponseOnly._dirtied && !_checked && uuid exists", async () => {
    await handleUpdateMission({
      ...baseFormData,
      uuid: "mission-uuid-1",
      ResponseOnly: { _dirtied: true, _checked: false, uuid: "response-uuid-1", parentId: "mission-uuid-1" },
    }, token)
    expect(AppActions.deleteResponseOnly).toHaveBeenCalledTimes(1)
    expect(AppActions.createResponseOnly).not.toHaveBeenCalled()
  })

  it("should not call createResponseOnly or deleteResponseOnly when ResponseOnly._dirtied is false", async () => {
    await handleUpdateMission({
      ...baseFormData,
      ResponseOnly: { _dirtied: false, _checked: true, uuid: undefined, parentId: "mission-uuid-1" },
    }, token)
    expect(AppActions.createResponseOnly).not.toHaveBeenCalled()
    expect(AppActions.deleteResponseOnly).not.toHaveBeenCalled()
  })

  it("should still return success when both _dirtied and ResponseOnly._dirtied are true", async () => {
    const result = await handleUpdateMission({
      ...baseFormData,
      _dirtied: true,
      uuid: "mission-uuid-2",
      ResponseOnly: { _dirtied: true, _checked: true, uuid: undefined, parentId: "mission-uuid-2" },
    }, token)
    expect(result).toEqual({ success: true, msg: "Mission Updated" })
    expect(AppActions.updateMission).toHaveBeenCalledTimes(1)
    expect(AppActions.createResponseOnly).toHaveBeenCalledTimes(1)
  })
})
