import { render, screen } from '@testing-library/react'
import { useDisableBtn } from '../hooks'

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form')
  return { ...actual, useFormContext: vi.fn() }
})

import { useFormContext } from 'react-hook-form'

const mockedUseFormContext = vi.mocked(useFormContext)

describe('useDisableBtn', () => {
  it('should return true when isValid is false', () => {
    mockedUseFormContext.mockReturnValue({
      formState: { isValid: false, isSubmitting: false }
    } as never)

    const TestComponent = () => {
      const disabled = useDisableBtn()
      return <span data-testid="result">{disabled ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('result')).toHaveTextContent('true')
  })

  it('should return true when isSubmitting is true', () => {
    mockedUseFormContext.mockReturnValue({
      formState: { isValid: true, isSubmitting: true }
    } as never)

    const TestComponent = () => {
      const disabled = useDisableBtn()
      return <span data-testid="result">{disabled ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('result')).toHaveTextContent('true')
  })

  it('should return false when isValid is true and isSubmitting is false', () => {
    mockedUseFormContext.mockReturnValue({
      formState: { isValid: true, isSubmitting: false }
    } as never)

    const TestComponent = () => {
      const disabled = useDisableBtn()
      return <span data-testid="result">{disabled ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('result')).toHaveTextContent('false')
  })
})
