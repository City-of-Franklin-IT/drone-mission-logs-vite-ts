import { setParams } from '../utils'

describe('setParams', () => {
  it('should return URLSearchParams with department when department is provided', () => {
    const params = setParams('Police')
    expect(params).toBeInstanceOf(URLSearchParams)
    expect(params!.get('department')).toBe('Police')
  })

  it('should return URLSearchParams for Fire department', () => {
    const params = setParams('Fire')
    expect(params!.get('department')).toBe('Fire')
  })

  it('should return undefined when department is undefined', () => {
    const params = setParams(undefined)
    expect(params).toBeUndefined()
  })
})
