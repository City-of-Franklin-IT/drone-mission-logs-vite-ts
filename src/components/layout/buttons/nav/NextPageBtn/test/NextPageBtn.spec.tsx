import { render, screen, fireEvent } from '@testing-library/react'
import NextPageBtn from '..'

describe('NextPageBtn', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<NextPageBtn onClick={vi.fn()} disabled={false} />)
      expect(screen.getByTestId('next-page-btn')).toBeInTheDocument()
    })

    it('should be enabled when disabled is false', () => {
      render(<NextPageBtn onClick={vi.fn()} disabled={false} />)
      expect(screen.getByTestId('next-page-btn')).not.toBeDisabled()
    })

    it('should be disabled when disabled is true', () => {
      render(<NextPageBtn onClick={vi.fn()} disabled={true} />)
      expect(screen.getByTestId('next-page-btn')).toBeDisabled()
    })
  })

  describe('User Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<NextPageBtn onClick={handleClick} disabled={false} />)
      fireEvent.click(screen.getByTestId('next-page-btn'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
