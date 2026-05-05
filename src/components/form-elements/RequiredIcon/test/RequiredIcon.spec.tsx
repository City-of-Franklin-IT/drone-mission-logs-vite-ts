import { render, screen } from '@testing-library/react'
import RequiredIcon from '..'

describe('RequiredIcon', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<RequiredIcon required={true} />)
    })

    it('should render the required asterisk when required is true', () => {
      render(<RequiredIcon required={true} />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('should render nothing when required is false', () => {
      const { container } = render(<RequiredIcon required={false} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('should render nothing when required is undefined', () => {
      const { container } = render(<RequiredIcon />)
      expect(container).toBeEmptyDOMElement()
    })
  })
})