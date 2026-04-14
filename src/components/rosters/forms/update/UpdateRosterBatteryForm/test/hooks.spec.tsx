import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RostersProvider } from '../../../../context'
import { useHandleUpdateRosterBatteryForm } from '../hooks'

vi.mock('@/helpers/hooks', () => ({ useEnableQuery: vi.fn() }))
vi.mock('@/utils/Toast/Toast', () => ({ errorPopup: vi.fn(), savedPopup: vi.fn() }))
vi.mock('../utils', () => ({ handleUpdateBattery: vi.fn() }))
vi.mock('../../UpdateRosterPersonnelForm/hooks', () => ({ useOnCancelBtnClick: vi.fn(() => vi.fn()) }))

import { useEnableQuery } from '@/helpers/hooks'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'
import { handleUpdateBattery } from '../utils'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RostersProvider>
        {children}
      </RostersProvider>
    </QueryClientProvider>
  )
}

beforeEach(() => vi.clearAllMocks())

describe('useHandleUpdateRosterBatteryForm', () => {
  it('returns methods, onCancelBtnClick, and handleFormSubmit', () => {
    vi.mocked(useEnableQuery).mockReturnValue({ enabled: true, token: 'test-token' } as any)

    let result: ReturnType<typeof useHandleUpdateRosterBatteryForm> | undefined

    const TestComponent = () => {
      result = useHandleUpdateRosterBatteryForm(undefined)
      return null
    }

    const Wrapper = createWrapper()
    render(<Wrapper><TestComponent /></Wrapper>)

    expect(result).toBeDefined()
    expect(result!.methods).toBeTruthy()
    expect(result!.onCancelBtnClick).toBeTruthy()
    expect(result!.handleFormSubmit).toBeTruthy()
  })

  it('calls savedPopup with the message when handleUpdateBattery returns success', async () => {
    vi.mocked(useEnableQuery).mockReturnValue({ enabled: true, token: 'test-token' } as any)
    vi.mocked(handleUpdateBattery).mockResolvedValue({ success: true, msg: 'Updated' } as any)

    const TestComponent = () => {
      const { handleFormSubmit } = useHandleUpdateRosterBatteryForm(undefined)
      return (
        <button onClick={() => handleFormSubmit({ batteryName: 'Test', registration: 'ABC', _dirtied: true } as any)}>
          Submit
        </button>
      )
    }

    const Wrapper = createWrapper()
    render(<Wrapper><TestComponent /></Wrapper>)

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(savedPopup).toHaveBeenCalledWith('Updated')
    })
    expect(errorPopup).not.toHaveBeenCalled()
  })

  it('calls errorPopup with the message when handleUpdateBattery returns failure', async () => {
    vi.mocked(useEnableQuery).mockReturnValue({ enabled: true, token: 'test-token' } as any)
    vi.mocked(handleUpdateBattery).mockResolvedValue({ success: false, msg: 'Error' } as any)

    const TestComponent = () => {
      const { handleFormSubmit } = useHandleUpdateRosterBatteryForm(undefined)
      return (
        <button onClick={() => handleFormSubmit({ batteryName: 'Test', registration: 'ABC', _dirtied: true } as any)}>
          Submit
        </button>
      )
    }

    const Wrapper = createWrapper()
    render(<Wrapper><TestComponent /></Wrapper>)

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(errorPopup).toHaveBeenCalledWith('Error')
    })
    expect(savedPopup).not.toHaveBeenCalled()
  })

  it('does not call handleUpdateBattery when enabled is false', async () => {
    vi.mocked(useEnableQuery).mockReturnValue({ enabled: false, token: 'test-token' } as any)

    const TestComponent = () => {
      const { handleFormSubmit } = useHandleUpdateRosterBatteryForm(undefined)
      return (
        <button onClick={() => handleFormSubmit({ batteryName: 'Test', registration: 'ABC', _dirtied: true } as any)}>
          Submit
        </button>
      )
    }

    const Wrapper = createWrapper()
    render(<Wrapper><TestComponent /></Wrapper>)

    await userEvent.click(screen.getByRole('button'))

    expect(handleUpdateBattery).not.toHaveBeenCalled()
  })

  it('does not call handleUpdateBattery when token is falsy', async () => {
    vi.mocked(useEnableQuery).mockReturnValue({ enabled: true, token: null } as any)

    const TestComponent = () => {
      const { handleFormSubmit } = useHandleUpdateRosterBatteryForm(undefined)
      return (
        <button onClick={() => handleFormSubmit({ batteryName: 'Test', registration: 'ABC', _dirtied: true } as any)}>
          Submit
        </button>
      )
    }

    const Wrapper = createWrapper()
    render(<Wrapper><TestComponent /></Wrapper>)

    await userEvent.click(screen.getByRole('button'))

    expect(handleUpdateBattery).not.toHaveBeenCalled()
  })
})
