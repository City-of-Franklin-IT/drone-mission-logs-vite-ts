import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MissionsCtx, { MissionsProvider } from '../../../context'
import { useHandleClearAllFilters, useHandleDateRangeFilterInputs, useHandleSearch, useHandlePersonnelFilter } from '../hooks'

vi.mock('../../../forms/create/CreatePersonnelForm/hooks', () => ({
  useGetPersonnel: vi.fn(() => ({ isLoading: false, isSuccess: true }))
}))

describe('useHandleDateRangeFilterInputs', () => {
  it('should update start date in context on start input change', async () => {
    const TestComponent = () => {
      const { startInputProps, endInputProps } = useHandleDateRangeFilterInputs()
      const { dateRangeFilter } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="start">{dateRangeFilter.start}</span>
          <input data-testid="start-input" type="date" {...startInputProps} />
          <input data-testid="end-input" type="date" {...endInputProps} />
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
})

describe('useHandleSearch', () => {
  it('should update search value in context on input change', async () => {
    const TestComponent = () => {
      const { inputProps } = useHandleSearch()
      const { searchValue } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="search">{searchValue}</span>
          <input type="text" {...inputProps} />
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
})

describe('useHandlePersonnelFilter', () => {
  it('should update personnelFilter in context on select change', async () => {
    const TestComponent = () => {
      const { selectProps } = useHandlePersonnelFilter()
      const { personnelFilter } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="filter">{personnelFilter}</span>
          <select {...selectProps}>
            <option value="">All</option>
            <option value="john.doe@example.com">John Doe</option>
          </select>
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
})

describe('useHandleClearAllFilters', () => {
  const TestComponent = () => {
    const { searchValue, personnelFilter, dateRangeFilter } = useContext(MissionsCtx)
    const { inputProps } = useHandleSearch()
    const clearBtnProps = useHandleClearAllFilters()

    return (
      <>
        <span data-testid="search">{searchValue}</span>
        <span data-testid="personnel">{personnelFilter}</span>
        <span data-testid="date-start">{dateRangeFilter.start}</span>
        <input type="text" {...inputProps} />
        <button type="button" {...clearBtnProps}>Clear All</button>
      </>
    )
  }

  it('should disable the clear-all button when no filters are active', () => {
    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should enable the clear-all button when a filter is active and clear it on click', async () => {
    render(
      <MissionsProvider>
        <TestComponent />
      </MissionsProvider>
    )

    await userEvent.type(screen.getByRole('textbox'), 'hello')
    await waitFor(() => expect(screen.getByRole('button')).toBeEnabled())

    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('search')).toBeEmptyDOMElement())
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
