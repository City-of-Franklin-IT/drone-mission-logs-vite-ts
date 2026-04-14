import { pageVariants } from '../utils'

describe('pageVariants', () => {
  it('should have initial state with opacity 0', () => {
    expect(pageVariants.initial.opacity).toBe(0)
  })

  it('should have in state with opacity 1', () => {
    expect(pageVariants.in.opacity).toBe(1)
  })

  it('should have out state with opacity 0', () => {
    expect(pageVariants.out.opacity).toBe(0)
  })
})
