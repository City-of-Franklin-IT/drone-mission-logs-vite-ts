import { authHeaders, formatDate } from '../utils'

describe('authHeaders', () => {
  it('should return Headers with Authorization when token is provided', () => {
    const headers = authHeaders('my-token')
    expect(headers.get('Authorization')).toBe('Bearer my-token')
  })

  it('should return Headers without Authorization when token is undefined', () => {
    const headers = authHeaders(undefined)
    expect(headers.get('Authorization')).toBeNull()
  })

  it('should return a Headers instance', () => {
    const headers = authHeaders('token')
    expect(headers).toBeInstanceOf(Headers)
  })
})

describe('formatDate', () => {
  it('should format an ISO date string to YYYY-MM-DD', () => {
    const result = formatDate('2025-07-28T12:00:00.000Z')
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should return a date string that can be parsed back to a valid date', () => {
    const input = '2025-01-15T00:00:00.000Z'
    const result = formatDate(input)
    const reparsed = new Date(result)
    expect(reparsed).toBeInstanceOf(Date)
    expect(isNaN(reparsed.getTime())).toBe(false)
  })

  it('should handle date-only strings', () => {
    const result = formatDate('2025-03-10')
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
