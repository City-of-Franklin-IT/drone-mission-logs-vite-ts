import { useContext, useRef, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { screen, render, waitFor, renderHook, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RostersCtx, { RostersProvider } from '../../context'
import { useHandleForm } from './hooks'

// Components
import * as Components from './components'

const mockedCreateRosterBatteryForm = vi.fn()

const mockedDeleteBtn = vi.fn()

const queryClient = new QueryClient() 

vi.mock('../../forms/create/CreateRosterBatteryForm', () => ({
  default: () => mockedCreateRosterBatteryForm()
}))

vi.mock('../../containers/PersonnelContainer/components', async () => {
  const actual = await vi.importActual('../../containers/PersonnelContainer/components')
  return {
    ...actual,
    DeleteBtn: () => mockedDeleteBtn()
  }
})

vi.mock('./hooks', async () => {
  const actual = await vi.importActual('./hooks')
  return {
    ...actual,
    useGetBattery: () => vi.fn()
  }
})

describe('BatteriesContainer', () => {

  describe('Form', () => {
    it('Conditionally renders the correct form', async () => {
      const { result } = renderHook(() => useRef<HTMLDivElement|null>(null))

      const ref = result.current

      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { dispatch } = useContext(RostersCtx)

        const newBtnOnClick = () => {
          dispatch({ type: 'SET_FORM_TYPE', payload: 'battery' })
        }

        const updateBtnOnClick = () => {
          dispatch({ type: 'SET_FORM_TYPE', payload: 'battery' })
          dispatch({ type: 'SET_FORM_UUID', payload: 'ABC123' })
        }

        return (
          <>
            <button
              type="button"
              onClick={newBtnOnClick}>
                New Btn
            </button>
            <button
              type="button"
              onClick={updateBtnOnClick}>
                Update Btn
            </button>
            {children}
          </>
        )
      }

      render(
        <QueryClientProvider client={queryClient}>
          <RostersProvider>
            <TestComponent>
              <Components.Form formRef={ref} />
            </TestComponent> 
          </RostersProvider>
        </QueryClientProvider>
      )

      await userEvent.click(screen.getAllByRole('button').shift()!)

      await waitFor(() => expect(mockedCreateRosterBatteryForm).toHaveBeenCalled())

      cleanup()

      render(
        <QueryClientProvider client={queryClient}>
          <RostersProvider>
            <TestComponent>
              <Components.Form formRef={ref} />
            </TestComponent> 
          </RostersProvider>
        </QueryClientProvider>
      )

      await userEvent.click(screen.getAllByRole('button').pop()!)

      await waitFor(() => expect(mockedDeleteBtn).toHaveBeenCalled())
    })
  })

  describe('useHandleForm', () => {
    it('Returns visible boolean', async () => {
      const { result } = renderHook(() => useHandleForm(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            <RostersProvider>
              {children}
            </RostersProvider>
          </QueryClientProvider>
        )
      })

      expect(result.current.visible).toBeFalsy()
    })

    it('Returns delete button props', async () => {
      const TestComponent = () => {
        const { dispatch } = useContext(RostersCtx)

        const { deleteBtnProps } = useHandleForm()

        useEffect(() => {
          dispatch({ type: 'SET_FORM_TYPE', payload: 'battery' })
          dispatch({ type: 'SET_FORM_UUID', payload: 'ABC123' })
        }, [])

        return (
          <>
            <button
              type="button"
              onClick={deleteBtnProps.onClick}>
                {deleteBtnProps.label}
            </button>
          </>
        )
      }

      render(
        <QueryClientProvider client={queryClient}>
          <RostersProvider>
            <TestComponent />
          </RostersProvider>
        </QueryClientProvider>
      )

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Confirm Delete'))
    })
  })
})