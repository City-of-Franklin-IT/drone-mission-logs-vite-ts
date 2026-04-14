import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RostersCtx, { RostersProvider } from '../../../context'
import { useOnCreateBtnClick, useHandleForm } from '../hooks'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: true, token: 'test-token' }))
}))

vi.mock('@/context/App/AppActions', () => ({
  deleteRosterPersonnel: vi.fn()
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

describe('useOnCreateBtnClick', () => {
  it('should set formType to the provided formType and clear formUUID in context after calling the returned fn', async () => {
    const TestComponent = () => {
      const onClick = useOnCreateBtnClick('personnel')
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

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('form-type')).toHaveTextContent('personnel')
      expect(screen.getByTestId('form-uuid')).toHaveTextContent('')
    })
  })
})

describe('useHandleForm', () => {
  it('should start with deleteBtnLabel as "Delete Personnel"', () => {
    const TestComponent = () => {
      const { deleteBtnLabel } = useHandleForm()

      return <span data-testid="label">{deleteBtnLabel}</span>
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('label')).toHaveTextContent('Delete Personnel')
  })

  it('should change deleteBtnLabel to "Confirm Delete" after first click without calling the API', async () => {
    const AppActions = await import('@/context/App/AppActions')

    const TestComponent = () => {
      const { deleteBtnLabel, onDeleteBtnClick } = useHandleForm()

      return (
        <>
          <span data-testid="label">{deleteBtnLabel}</span>
          <button type="button" onClick={onDeleteBtnClick}>Delete</button>
        </>
      )
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    expect(screen.getByTestId('label')).toHaveTextContent('Delete Personnel')

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Confirm Delete'))

    expect(AppActions.deleteRosterPersonnel).not.toHaveBeenCalled()
  })

  it('should call deleteRosterPersonnel on second click of onDeleteBtnClick', async () => {
    const AppActions = await import('@/context/App/AppActions')
    vi.mocked(AppActions.deleteRosterPersonnel).mockResolvedValue({ success: true, msg: 'Deleted' } as never)

    const TestComponent = () => {
      const { deleteBtnLabel, onDeleteBtnClick } = useHandleForm()

      return (
        <>
          <span data-testid="label">{deleteBtnLabel}</span>
          <button type="button" onClick={onDeleteBtnClick}>Delete</button>
        </>
      )
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )

    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Confirm Delete'))

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(AppActions.deleteRosterPersonnel).toHaveBeenCalled())
  })
})
