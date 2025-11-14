import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MissionsCtx, { MissionsProvider } from '../../context'
import { useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from './hooks'

// Components
import FiltersContainer from '.'

vi.mock('@/components/missions/forms/create/CreatePersonnelForm/hooks', async () => {
  const actual = vi.importActual('@/components/missions/forms/create/CreatePersonnelForm/hooks')
  return {
    ...actual,
    useGetPersonnel: vi.fn(() => ({ isSuccess: true }))
  }
})

vi.mock('@/components/missions/forms/create/CreatePersonnelForm/components', async () => {
  const actual = await vi.importActual('@/components/missions/forms/create/CreatePersonnelForm/components')
  return {
    ...actual,
    PersonnelOptions: () => (
      <>
        <option value="test.o365-3@franklintn.gov">test.o365-3@franklintn.gov</option>
      </>
    )
  }
})

describe('FiltersContainer', () => {

  describe('DateRangerFilterInputs', () => {
    it('Update dateRangeFilter in MissionsCtx on change', async () => {
      const TestComponent = () => {
        const { dateRangeFilter } = useContext(MissionsCtx)

        return (
          <>
            <span data-testid="test-span">Filter Start: {dateRangeFilter.start}</span>
            <FiltersContainer visible={true} />
          </>
        )
      }

      render(
        <MemoryRouter>
          <MissionsProvider>
            <TestComponent />
          </MissionsProvider>
        </MemoryRouter>
      )

      await userEvent.type(screen.getAllByTestId('date-range-input').shift()!, '2025-07-28')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Start: 2025-07-28'))
    })
  })

  describe('PersonnelFilter', () => {
    it('Updates personnelFilter in MissionsCtx on change', async () => {
      const TestComponent = () => {
        const { personnelFilter } = useContext(MissionsCtx)

        return (
          <>
            <span data-testid="test-span">Personnel Filter: {personnelFilter}</span>
            <FiltersContainer visible={true} />
          </>
        )
      }

      render(
        <MemoryRouter>
          <MissionsProvider>
            <TestComponent />
          </MissionsProvider>
        </MemoryRouter>
      )

      await userEvent.selectOptions(screen.getByRole('combobox'), 'test.o365-3@franklintn.gov')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Personnel Filter: test.o365-3@franklintn.gov'))
    })
  })

  describe('Search', () => {
    it('Updates searchValue in MissionsCtx on change', async () => {
      const TestComponent = () => {
        const { searchValue } = useContext(MissionsCtx)

        return (
          <>
            <span data-testid="test-span">Search Value: {searchValue}</span>
            <FiltersContainer visible={true} />
          </>
        )
      }

      render(
        <MemoryRouter>
          <MissionsProvider>
            <TestComponent />
          </MissionsProvider>
        </MemoryRouter>
      )

      await userEvent.type(screen.getByRole('textbox'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))
    })
  })

  describe('ClearBtn', () => {
    it('Resets filter in MissionsCtx on click', async () => {
      const TestComponent = () => {
        const { searchValue } = useContext(MissionsCtx)

        return (
          <>
            <span data-testid="test-span">Search Value: {searchValue}</span>
            <FiltersContainer visible={true} />
          </>
        )
      }

      render(
        <MemoryRouter>
          <MissionsProvider>
            <TestComponent />
          </MissionsProvider>
        </MemoryRouter>
      )

      await userEvent.type(screen.getByRole('textbox'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))

      await userEvent.click(screen.queryAllByRole('button')[2]) // Clear search value button

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value:'))
    })
  })

  describe('useHandleDateRangeFilterInputs', () => {
    it('Returns on change handlers for date range filter inputs and props for clear button', async () => {
      const TestComponent = () => {
        const { startInputProps, endInputProps, clearBtnProps } = useHandleDateRangeFilterInputs()

        return (
          <>
            <input 
              type="date"
              { ...startInputProps } />
            <input
              data-testid="date-range-input" 
              type="date"
              { ...endInputProps } />
            <button 
              data-testid="date-range-input"
              type="button"
              { ...clearBtnProps }>
                Clear
            </button>
          </>
        )
      }

      render(
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      )

      await userEvent.type(screen.getAllByTestId('date-range-input').shift()!, '2025-01-01')

    })
  })
  
  describe('useHandlePersonnelFilter', () => {
    it('Returns props for select element and clear button, loading boolean', async () => {
      const TestComponent = () => {
        const { loading, selectProps, clearBtnProps } = useHandlePersonnelFilter()

        if(loading) return

        return (
          <>
            <select { ...selectProps }>
              <option value={'bin.franklin@franklintn.gov'}>bin.franklin@franklintn.gov</option>
            </select>
            <button 
              type="button"
              { ...clearBtnProps }>
                Clear
            </button>
          </>
        )
      }

      render(
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      )

      await userEvent.selectOptions(screen.getByRole('combobox'), 'bin.franklin@franklintn.gov')

      await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('bin.franklin@franklintn.gov'))

      await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled())
    })
  })

  describe('useHandleSearch', () => {
    it('Returns input props and clear button props', async () => {
      const TestComponent = () => {
        const { inputProps, clearBtnProps } = useHandleSearch()

        return (
          <>
            <input 
              type="text"
              { ...inputProps } />
            <button 
              type="button"
              { ...clearBtnProps }>
                Clear
            </button>
          </>
        )
      }

      render(
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      )

      expect(screen.getByRole('button')).toBeDisabled()

      await userEvent.type(screen.getByRole('textbox'), 'ABC123')

      await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('ABC123'))

      await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled())
    })
  })
})