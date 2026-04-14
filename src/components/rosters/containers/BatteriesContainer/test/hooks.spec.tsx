import { useContext } from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RostersCtx, { RostersProvider } from '../../../context'
import { useHandleCreateBtn, useHandleForm } from '../hooks'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: true, token: 'test-token' }))
}))

vi.mock('@/context/App/AppActions', () => ({
  deleteRosterBattery: vi.fn()
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

const WrapperWithFilter = ({ children }: { children: React.ReactNode }) => {
  const SetFilter = () => {
    const { dispatch } = useContext(RostersCtx)

    return (
      <button
        type="button"
        data-testid="set-filter"
        onClick={() => dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload: 'some-filter' })}>
          Set Filter
      </button>
    )
  }

  return (
    <QueryClientProvider client={createQueryClient()}>
      <RostersProvider>
        <SetFilter />
        {children}
      </RostersProvider>
    </QueryClientProvider>
  )
}

describe('useHandleCreateBtn', () => {
  it('should have visible as false when batteryRosterFilter is empty', () => {
    const TestComponent = () => {
      const { visible } = useHandleCreateBtn()
      return <span data-testid="visible">{visible ? 'true' : 'false'}</span>
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('visible')).toHaveTextContent('false')
  })

  it('should have visible as true when batteryRosterFilter is set', async () => {
    const TestComponent = () => {
      const { visible } = useHandleCreateBtn()
      return <span data-testid="visible">{visible ? 'true' : 'false'}</span>
    }

    render(
      <WrapperWithFilter>
        <TestComponent />
      </WrapperWithFilter>
    )

    await userEvent.click(screen.getByTestId('set-filter'))

    await waitFor(() => expect(screen.getByTestId('visible')).toHaveTextContent('true'))
  })

  it('should set formType to "battery" and formUUID to "" in context after calling onClick', async () => {
    const TestComponent = () => {
      const { onClick } = useHandleCreateBtn()
      const { formType, formUUID } = useContext(RostersCtx)

      return (
        <>
          <span data-testid="form-type">{formType ?? 'null'}</span>
          <span data-testid="form-uuid">{formUUID}</span>
          <button type="button" onClick={onClick}>Create</button>
        </>
      )
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('form-type')).toHaveTextContent('null')

    await userEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByTestId('form-type')).toHaveTextContent('battery')
      expect(screen.getByTestId('form-uuid')).toHaveTextContent('')
    })
  })
})

describe('useHandleForm', () => {
  it('should have visible as false when formType is not "battery"', () => {
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

  it('should have visible as true when formType is "battery"', async () => {
    const SetFormType = () => {
      const { dispatch } = useContext(RostersCtx)

      return (
        <button
          type="button"
          data-testid="set-type"
          onClick={() => dispatch({ type: 'SET_FORM_TYPE', payload: 'battery' })}>
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

  it('should start deleteBtnProps.label as "Delete Battery" and change to "Confirm Delete" after first click', async () => {
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

    expect(screen.getByTestId('label')).toHaveTextContent('Delete Battery')

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Confirm Delete'))
  })
})
