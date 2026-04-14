import { render, screen } from '@testing-library/react'
import { useSetForm } from '../hooks'

vi.mock('react-router', () => ({
  useParams: vi.fn()
}))

vi.mock('../utils', () => ({
  createFormMap: new Map([
    ['mission', () => <div data-testid="mock-form">Mock Form</div>]
  ])
}))

import { useParams } from 'react-router'

describe('useSetForm', () => {
  it('should return the form component when a valid formtype param exists', () => {
    vi.mocked(useParams).mockReturnValue({ formtype: 'mission' })

    const TestComponent = () => {
      const Form = useSetForm()
      if(!Form) return <span data-testid="no-form">No Form</span>
      return <Form />
    }

    render(<TestComponent />)

    expect(screen.getByTestId('mock-form')).toBeInTheDocument()
  })

  it('should return undefined when formtype param is undefined', () => {
    vi.mocked(useParams).mockReturnValue({ formtype: undefined })

    const TestComponent = () => {
      const Form = useSetForm()
      if(!Form) return <span data-testid="no-form">No Form</span>
      return <Form />
    }

    render(<TestComponent />)

    expect(screen.getByTestId('no-form')).toBeInTheDocument()
  })

  it('should return undefined when formtype is not in the map', () => {
    vi.mocked(useParams).mockReturnValue({ formtype: 'unknown-form' })

    const TestComponent = () => {
      const Form = useSetForm()
      if(!Form) return <span data-testid="no-form">No Form</span>
      return <Form />
    }

    render(<TestComponent />)

    expect(screen.getByTestId('no-form')).toBeInTheDocument()
  })
})
