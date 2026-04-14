import { render, screen, fireEvent } from '@testing-library/react'
import DeleteBtn from '..'

describe('DeleteBtn', () => {
  describe('Rendering', () => {
    it('should render button with children and recycle icon', () => {
      render(<DeleteBtn onClick={vi.fn()}>Delete Item</DeleteBtn>)
      expect(screen.getByText('Delete Item')).toBeInTheDocument()
      expect(screen.getByAltText('recycle icon')).toBeInTheDocument()
    })

    it('should be enabled by default', () => {
      render(<DeleteBtn onClick={vi.fn()}>Delete</DeleteBtn>)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<DeleteBtn onClick={vi.fn()} disabled={true}>Delete</DeleteBtn>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('User Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<DeleteBtn onClick={handleClick}>Delete</DeleteBtn>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<DeleteBtn onClick={handleClick} disabled={true}>Delete</DeleteBtn>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
