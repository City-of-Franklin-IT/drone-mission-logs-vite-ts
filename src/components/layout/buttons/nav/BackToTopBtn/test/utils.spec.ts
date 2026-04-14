import { handleClick } from '../utils'

describe('handleClick', () => {
  it('should call scrollIntoView on the ref element when ref.current exists', () => {
    const mockScrollIntoView = vi.fn()
    const topRef = { current: { scrollIntoView: mockScrollIntoView } as unknown as HTMLDivElement }

    handleClick(topRef)

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('should not throw when ref.current is null', () => {
    const topRef = { current: null }

    expect(() => handleClick(topRef)).not.toThrow()
  })
})
