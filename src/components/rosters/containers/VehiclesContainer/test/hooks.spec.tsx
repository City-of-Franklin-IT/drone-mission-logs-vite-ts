import { useContext } from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RostersCtx, { RostersProvider } from '../../../context'
import { useHandleForm } from '../hooks'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: true, token: 'test-token' }))
}))

vi.mock('@/context/App/AppActions', () => ({
  deleteRosterVehicle: vi.fn()
}))

vi.mock('@/utils/Toast/Toast', () => ({
  errorPopup: vi.fn(),
  savedPopup: vi.fn()
}))

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })

const Wrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <QueryClientProvider client={createQueryClient()}>
      <RostersProvider>
        {children}
      </RostersProvider>
    </QueryClientProvider>
  )
}

describe('useHandleForm', () => {
  it('should have visible as false when formType is null', () => {
    const TestComponent = () => {
      const { visible } = useHandleForm()
      return <span data-testid="visible">{visible ? 'true' : 'false'}</span>
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('visible')).toHaveTextContent('false')
  })

  it('should have visible as true when formType is "vehicle"', async () => {
    const SetFormType = () => {
      const { dispatch } = useContext(RostersCtx)

      return (
        <button
          type="button"
          data-testid="set-type"
          onClick={() => dispatch({ type: 'SET_FORM_TYPE', payload: 'vehicle' })}>
            Set Type
        </button>
      )
    }

    const TestComponent = () => {
      const { visible } = useHandleForm()
      return <span data-testid="visible">{visible ? 'true' : 'false'}</span>
    }

    render(
      <Wrapper>
        <SetFormType />
        <TestComponent />
      </Wrapper>
    )

    await userEvent.click(screen.getByTestId('set-type'))

    await waitFor(() => expect(screen.getByTestId('visible')).toHaveTextContent('true'))
  })

  it('should start deleteBtnProps.label as "Delete Vehicle" and change to "Confirm Delete" after first click', async () => {
    const TestComponent = () => {
      const { deleteBtnProps } = useHandleForm()

      return (
        <>
          <span data-testid="label">{deleteBtnProps.label}</span>
          <button type="button" onClick={deleteBtnProps.onClick}>Delete</button>
        </>
      )
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('label')).toHaveTextContent('Delete Vehicle')

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Confirm Delete'))
  })
})
