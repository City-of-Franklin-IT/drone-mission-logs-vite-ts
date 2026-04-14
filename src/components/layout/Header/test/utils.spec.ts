import { handleTitleIconSrc } from '../utils'

vi.mock('@/assets/icons/fpd/fpd.png', () => ({ default: 'fpd-icon.png' }))
vi.mock('@/assets/icons/ffd/ffd.png', () => ({ default: 'ffd-icon.png' }))

describe('handleTitleIconSrc', () => {
  it('should return fpdIcon when hostname is "pdapps.franklintn.gov"', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'pdapps.franklintn.gov' },
      writable: true
    })

    expect(handleTitleIconSrc()).toBe('fpd-icon.png')
  })

  it('should return ffdIcon when hostname is not "pdapps.franklintn.gov"', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'localhost' },
      writable: true
    })

    expect(handleTitleIconSrc()).toBe('ffd-icon.png')
  })
})
