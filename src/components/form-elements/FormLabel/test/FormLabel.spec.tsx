import { render, screen } from '@testing-library/react'
import FormLabel from '..'

describe('FormLabel', () => {
  describe('Rendering', () => {
    it('should render label with children text', () => {
      render(<FormLabel name="missionDate">Mission Date</FormLabel>)
      expect(screen.getByText('Mission Date')).toBeInTheDocument()
    })

    it('should render a label element linked to the field name', () => {
      render(<FormLabel name="missionDate">Mission Date</FormLabel>)
      expect(screen.getByTestId('form-label')).toHaveAttribute('for', 'missionDate')
    })

    it('should render RequiredIcon when required is true', () => {
      render(<FormLabel name="missionDate" required>Mission Date</FormLabel>)
      expect(screen.getByAltText('required icon')).toBeInTheDocument()
    })

    it('should not render RequiredIcon when required is not set', () => {
      render(<FormLabel name="missionDate">Mission Date</FormLabel>)
      expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
    })

    it('should not render RequiredIcon when required is false', () => {
      render(<FormLabel name="missionDate" required={false}>Mission Date</FormLabel>)
      expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
    })
  })
})
