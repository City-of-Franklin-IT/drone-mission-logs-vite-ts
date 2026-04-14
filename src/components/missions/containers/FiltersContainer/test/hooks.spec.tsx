import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MissionsCtx, { MissionsProvider } from '../../../context'
import { useHandleDateRangeFilterInputs, useHandleSearch, useHandlePersonnelFilter } from '../hooks'

vi.mock('../../../forms/create/CreatePersonnelForm/hooks', () => ({
  useGetPersonnel: vi.fn(() => ({ isLoading: false, isSuccess: true }))
}))

describe('useHandleDateRangeFilterInputs', () => {
  it('should update start date in context on start input change', async () => {
    const TestComponent = () => {
      const { startInputProps, endInputProps, clearBtnProps } = useHandleDateRangeFilterInputs()
      const { dateRangeFilter } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="start">{dateRangeFilter.start}</span>
          <input data-testid="start-input" type="date" {...startInputProps} />
          <input data-testid="end-input" type="date" {...endInputProps} />
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    await userEvent.type(screen.getByTestId('start-input'), '2025-07-28')
    await waitFor(() => expect(screen.getByTestId('start')).toHaveTextContent('2025-07-28'))
  })

  it('should disable clear button when both dates are empty', () => {
    const TestComponent = () => {
      const { clearBtnProps } = useHandleDateRangeFilterInputs()
      return <button type="button" {...clearBtnProps}>Clear</button>
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })
})

describe('useHandleSearch', () => {
  it('should update search value in context on input change', async () => {
    const TestComponent = () => {
      const { inputProps, clearBtnProps } = useHandleSearch()
      const { searchValue } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="search">{searchValue}</span>
          <input type="text" {...inputProps} />
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    await userEvent.type(screen.getByRole('textbox'), 'ABC123')
    await waitFor(() => expect(screen.getByTestId('search')).toHaveTextContent('ABC123'))
  })

  it('should disable clear button when search value is empty', () => {
    const TestComponent = () => {
      const { inputProps, clearBtnProps } = useHandleSearch()
      return (
        <>
          <input type="text" {...inputProps} />
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should clear the search value on clear button click', async () => {
    const TestComponent = () => {
      const { inputProps, clearBtnProps } = useHandleSearch()
      const { searchValue } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="search">{searchValue}</span>
          <input type="text" {...inputProps} />
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    await userEvent.type(screen.getByRole('textbox'), 'hello')
    await waitFor(() => expect(screen.getByTestId('search')).toHaveTextContent('hello'))
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('search')).toBeEmptyDOMElement())
  })
})

describe('useHandlePersonnelFilter', () => {
  it('should update personnelFilter in context on select change', async () => {
    const TestComponent = () => {
      const { selectProps, clearBtnProps } = useHandlePersonnelFilter()
      const { personnelFilter } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="filter">{personnelFilter}</span>
          <select {...selectProps}>
            <option value="">All</option>
            <option value="john.doe@example.com">John Doe</option>
          </select>
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    await userEvent.selectOptions(screen.getByRole('combobox'), 'john.doe@example.com')
    await waitFor(() => expect(screen.getByTestId('filter')).toHaveTextContent('john.doe@example.com'))
  })

  it('should disable clear button when no personnel filter is set', () => {
    const TestComponent = () => {
      const { selectProps, clearBtnProps } = useHandlePersonnelFilter()
      return (
        <>
          <select {...selectProps}><option value="">All</option></select>
          <button type="button" {...clearBtnProps}>Clear</button>
        </>
      )
    }

    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })
})
