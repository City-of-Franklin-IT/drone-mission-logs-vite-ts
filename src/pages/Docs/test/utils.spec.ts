import { docColorsMap } from "../utils"

describe("docColorsMap", () => {
  it("should have 5 entries", () => {
    expect(docColorsMap.size).toBe(5)
  })

  it("should map 'GET' to 'badge-success'", () => {
    expect(docColorsMap.get("GET")).toBe("badge-success")
  })

  it("should map 'POST' to 'badge-info'", () => {
    expect(docColorsMap.get("POST")).toBe("badge-info")
  })

  it("should map 'PUT' to 'badge-warning'", () => {
    expect(docColorsMap.get("PUT")).toBe("badge-warning")
  })

  it("should map 'DELETE' to 'badge-error'", () => {
    expect(docColorsMap.get("DELETE")).toBe("badge-error")
  })

  it("should map 'PATCH' to 'badge-secondary'", () => {
    expect(docColorsMap.get("PATCH")).toBe("badge-secondary")
  })

  it("should return undefined for an unknown HTTP method", () => {
    // @ts-expect-error intentional unknown key
    expect(docColorsMap.get("HEAD")).toBeUndefined()
  })
})
