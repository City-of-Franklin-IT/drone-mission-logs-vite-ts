import { render, screen, fireEvent } from '@testing-library/react'
import PrevPageBtn from '..'

describe('PrevPageBtn', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<PrevPageBtn onClick={vi.fn()} disabled={false} />)
      expect(screen.getByTestId('prev-page-btn')).toBeInTheDocument()
    })

    it('should be enabled when disabled is false', () => {
      render(<PrevPageBtn onClick={vi.fn()} disabled={false} />)
      expect(screen.getByTestId('prev-page-btn')).not.toBeDisabled()
    })

    it('should be disabled when disabled is true', () => {
      render(<PrevPageBtn onClick={vi.fn()} disabled={true} />)
      expect(screen.getByTestId('prev-page-btn')).toBeDisabled()
    })
  })

  describe('User Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<PrevPageBtn onClick={handleClick} disabled={false} />)
      fireEvent.click(screen.getByTestId('prev-page-btn'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
