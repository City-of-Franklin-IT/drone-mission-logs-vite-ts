import { render, screen } from '@testing-library/react'
import RequiredIcon from '..'

describe('RequiredIcon', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<RequiredIcon />)
    })

    it('should render an img with alt text "required icon"', () => {
      render(<RequiredIcon />)
      expect(screen.getByAltText('required icon')).toBeInTheDocument()
    })
  })
})
