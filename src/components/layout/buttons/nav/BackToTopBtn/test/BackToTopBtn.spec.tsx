import { render, screen, fireEvent } from '@testing-library/react'
import BackToTopBtn from '..'

describe('BackToTopBtn', () => {
  describe('Rendering', () => {
    it('should render a "Back To Top" button', () => {
      const topRef = { current: null }
      render(<BackToTopBtn topRef={topRef} />)
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call scrollIntoView on the ref element when clicked', () => {
      const mockScrollIntoView = vi.fn()
      const topRef = { current: { scrollIntoView: mockScrollIntoView } as unknown as HTMLDivElement }

      render(<BackToTopBtn topRef={topRef} />)
      fireEvent.click(screen.getByRole('button'))

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
  })
})
