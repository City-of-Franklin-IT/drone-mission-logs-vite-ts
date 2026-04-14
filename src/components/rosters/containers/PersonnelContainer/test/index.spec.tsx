import { useContext, useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RostersCtx, { RostersProvider } from '../../../context'
import PersonnelContainer from '..'
import * as Components from '../components'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: true, token: 'test-token' }))
}))

vi.mock('@/components/rosters/forms/create/CreateRosterPersonnelForm', () => ({
  default: () => <div data-testid="create-personnel-form" />
}))

vi.mock('@/components/rosters/forms/update/UpdateRosterPersonnelForm', () => ({
  default: () => <div data-testid="update-personnel-form" />
}))

vi.mock('../hooks', async () => {
  const actual = await vi.importActual('../hooks')
  return {
    ...actual,
    useGetPersonnel: vi.fn(() => ({ data: undefined, isSuccess: true }))
  }
})

vi.mock('@/utils/Toast/Toast', () => ({
  errorPopup: vi.fn(),
  savedPopup: vi.fn()
}))

// jsdom does not implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn()

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })

type SetupProps = {
  formType?: string
  formUUID?: string
}

const SetupComponent = ({ formType, formUUID }: SetupProps) => {
  const { dispatch } = useContext(RostersCtx)

  useEffect(() => {
    if(formType) dispatch({ type: 'SET_FORM_TYPE', payload: formType as 'battery' | 'personnel' | 'vehicle' })
    if(formUUID !== undefined) dispatch({ type: 'SET_FORM_UUID', payload: formUUID })
  }, [])

  return null
}

const formRef = { current: null } as React.RefObject<HTMLDivElement>

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    <RostersProvider>
      {children}
    </RostersProvider>
  </QueryClientProvider>
)

describe('Components.Form', () => {
  it('renders nothing when formType is null', () => {
    render(
      <Wrapper>
        <Components.Form formRef={formRef} />
      </Wrapper>
    )

    expect(screen.queryByTestId('create-personnel-form')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete personnel/i })).not.toBeInTheDocument()
  })

  it('renders create personnel form when formType is "personnel" and formUUID is empty', async () => {
    render(
      <Wrapper>
        <SetupComponent formType="personnel" formUUID="" />
        <Components.Form formRef={formRef} />
      </Wrapper>
    )

    await waitFor(() =>
      expect(screen.getByTestId('create-personnel-form')).toBeInTheDocument()
    )
  })

  it('renders delete button when formType is "personnel" and formUUID is set', async () => {
    render(
      <Wrapper>
        <SetupComponent formType="personnel" formUUID="person-uuid-123" />
        <Components.Form formRef={formRef} />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('create-personnel-form')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /delete personnel/i })).toBeInTheDocument()
    })
  })
})

describe('PersonnelContainer', () => {
  it('clicking "Add Personnel" button sets formType to "personnel" in context', async () => {
    const TestWrapper = ({ personnel }: { personnel: [] }) => {
      const { formType } = useContext(RostersCtx)

      return (
        <>
          <span data-testid="form-type">{formType ?? ''}</span>
          <PersonnelContainer personnel={personnel} />
        </>
      )
    }

    render(
      <Wrapper>
        <TestWrapper personnel={[]} />
      </Wrapper>
    )

    expect(screen.getByTestId('form-type')).toHaveTextContent('')

    const addBtn = screen.getByRole('button', { name: /add personnel/i })
    await userEvent.click(addBtn)

    await waitFor(() =>
      expect(screen.getByTestId('form-type')).toHaveTextContent('personnel')
    )
  })
})
