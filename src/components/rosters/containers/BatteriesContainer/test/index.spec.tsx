import { useContext, useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RostersCtx, { RostersProvider } from '../../../context'
import * as Components from '../components'

vi.mock('@/helpers/hooks', () => ({
  useEnableQuery: vi.fn(() => ({ enabled: true, token: 'test-token' }))
}))

vi.mock('@/components/rosters/forms/create/CreateRosterBatteryForm', () => ({
  default: () => <div data-testid="create-battery-form" />
}))

vi.mock('@/components/rosters/forms/update/UpdateRosterBatteryForm', () => ({
  default: () => <div data-testid="update-battery-form" />
}))

vi.mock('../hooks', async () => {
  const actual = await vi.importActual('../hooks')
  return {
    ...actual,
    useGetBattery: vi.fn(() => ({ data: undefined, isSuccess: true }))
  }
})

vi.mock('@/utils/Toast/Toast', () => ({
  errorPopup: vi.fn(),
  savedPopup: vi.fn()
}))

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })

type SetupProps = {
  formType?: string
  formUUID?: string
  batteryRosterFilter?: string
}

const SetupComponent = ({ formType, formUUID, batteryRosterFilter }: SetupProps) => {
  const { dispatch } = useContext(RostersCtx)

  useEffect(() => {
    if(formType) dispatch({ type: 'SET_FORM_TYPE', payload: formType as 'battery' | 'personnel' | 'vehicle' })
    if(formUUID !== undefined) dispatch({ type: 'SET_FORM_UUID', payload: formUUID })
    if(batteryRosterFilter) dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload: batteryRosterFilter })
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

    expect(screen.queryByTestId('create-battery-form')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete battery/i })).not.toBeInTheDocument()
  })

  it('renders create form when formType is "battery" and formUUID is empty', async () => {
    render(
      <Wrapper>
        <SetupComponent formType="battery" formUUID="" />
        <Components.Form formRef={formRef} />
      </Wrapper>
    )

    await waitFor(() =>
      expect(screen.getByTestId('create-battery-form')).toBeInTheDocument()
    )
  })

  it('renders delete button (not create form) when formType is "battery" and formUUID is set', async () => {
    render(
      <Wrapper>
        <SetupComponent formType="battery" formUUID="abc123" />
        <Components.Form formRef={formRef} />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('create-battery-form')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /delete battery/i })).toBeInTheDocument()
    })
  })
})

describe('Components.CreateBtn', () => {
  it('CreateBtn is not visible when batteryRosterFilter is empty', () => {
    render(
      <Wrapper>
        <Components.CreateBtn />
      </Wrapper>
    )

    expect(screen.queryByRole('button', { name: /add battery/i })).not.toBeInTheDocument()
  })

  it('CreateBtn is visible when batteryRosterFilter is set', async () => {
    render(
      <Wrapper>
        <SetupComponent batteryRosterFilter="some-battery" />
        <Components.CreateBtn />
      </Wrapper>
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /add battery/i })).toBeInTheDocument()
    )
  })
})
