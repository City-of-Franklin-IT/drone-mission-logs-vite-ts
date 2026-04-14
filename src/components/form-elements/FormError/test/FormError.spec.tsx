import { render, screen } from '@testing-library/react'
import FormError from '..'

describe('FormError', () => {
  describe('Rendering', () => {
    it('should render error message when error string is provided', () => {
      render(<FormError error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('should render nothing when error is undefined', () => {
      const { container } = render(<FormError error={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('should render nothing when error is empty string', () => {
      const { container } = render(<FormError error="" />)
      expect(container).toBeEmptyDOMElement()
    })
  })
})
