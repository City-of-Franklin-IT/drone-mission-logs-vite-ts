import { visibilityTypeMap } from "../utils"

describe("visibilityTypeMap", () => {
  it("should have 4 entries", () => {
    expect(visibilityTypeMap.size).toBe(4)
  })

  it("should map 'clear' to the correct value and label", () => {
    const entry = visibilityTypeMap.get("clear")
    expect(entry?.value).toBe("clear")
    expect(entry?.label).toBe("Clear Visibility - blue skies with no visible clouds")
  })

  it("should map 'partly cloudy' to the correct value and label", () => {
    const entry = visibilityTypeMap.get("partly cloudy")
    expect(entry?.value).toBe("partly cloudy")
    expect(entry?.label).toBe("Partly Cloudy - mix of clouds and clear sky")
  })

  it("should map 'mostly cloudy' to the correct value and label", () => {
    const entry = visibilityTypeMap.get("mostly cloudy")
    expect(entry?.value).toBe("mostly cloudy")
    expect(entry?.label).toBe("Mostly Cloudy - clouds with some clear patches")
  })

  it("should map 'overcast' to the correct value and label", () => {
    const entry = visibilityTypeMap.get("overcast")
    expect(entry?.value).toBe("overcast")
    expect(entry?.label).toBe("Overcast - complete cloud coverage")
  })

  it("should return undefined for an unknown key", () => {
    // @ts-expect-error intentional unknown key
    expect(visibilityTypeMap.get("foggy")).toBeUndefined()
  })
})
