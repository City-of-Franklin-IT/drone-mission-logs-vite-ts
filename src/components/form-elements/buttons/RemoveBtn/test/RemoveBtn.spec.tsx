import { render, screen, fireEvent } from '@testing-library/react'
import RemoveBtn from '..'

describe('RemoveBtn', () => {
  describe('Rendering', () => {
    it('should render the button when visible is true', () => {
      render(<RemoveBtn onClick={vi.fn()} visible={true} />)
      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
    })

    it('should render nothing when visible is false', () => {
      const { container } = render(<RemoveBtn onClick={vi.fn()} visible={false} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('User Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<RemoveBtn onClick={handleClick} visible={true} />)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
