import { vi } from "vitest"

vi.mock("@/components/missions/forms/create/CreateMissionForm", () => ({
  default: vi.fn(),
}))

import { createFormMap } from "../utils"
import CreateMissionForm from "@/components/missions/forms/create/CreateMissionForm"

describe("createFormMap", () => {
  it("should have 1 entry", () => {
    expect(createFormMap.size).toBe(1)
  })

  it("should map 'mission' to the CreateMissionForm component", () => {
    expect(createFormMap.get("mission")).toBe(CreateMissionForm)
  })

  it("should return a truthy value for 'mission'", () => {
    expect(createFormMap.get("mission")).toBeTruthy()
  })

  it("should return undefined for an unknown key", () => {
    expect(createFormMap.get("unknown")).toBeUndefined()
  })
})
