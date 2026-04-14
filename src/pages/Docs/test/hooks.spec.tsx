import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useHandleEndpointItem } from '../hooks'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: false, token: undefined }))
}))

vi.mock('@/context/App/AppActions', () => ({
  getDocs: vi.fn()
}))

describe('useHandleEndpointItem', () => {
  it('should start with checked as false', () => {
    const TestComponent = () => {
      const { checked } = useHandleEndpointItem()
      return <span data-testid="checked">{checked ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('checked')).toHaveTextContent('false')
  })

  it('should set checked to true after calling onChange once', async () => {
    const TestComponent = () => {
      const { checked, onChange } = useHandleEndpointItem()

      return (
        <>
          <span data-testid="checked">{checked ? 'true' : 'false'}</span>
          <input type="checkbox" onChange={onChange} checked={checked} />
        </>
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('checked')).toHaveTextContent('false')

    await userEvent.click(screen.getByRole('checkbox'))

    await waitFor(() => expect(screen.getByTestId('checked')).toHaveTextContent('true'))
  })

  it('should toggle checked back to false after calling onChange twice', async () => {
    const TestComponent = () => {
      const { checked, onChange } = useHandleEndpointItem()

      return (
        <>
          <span data-testid="checked">{checked ? 'true' : 'false'}</span>
          <input type="checkbox" onChange={onChange} checked={checked} />
        </>
      )
    }

    render(<TestComponent />)

    await userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(screen.getByTestId('checked')).toHaveTextContent('true'))

    await userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(screen.getByTestId('checked')).toHaveTextContent('false'))
  })
})
