import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MissionsCtx, { MissionsProvider } from '../../context'

// Components
import FiltersContainer from '.'

vi.mock('@/components/missions/forms/create/CreatePersonnelForm/hooks', async () => {
  const actual = vi.importActual('@/components/missions/forms/create/CreatePersonnelForm/hooks')
  return {
    ...actual,
    useGetPersonnel: vi.fn(() => ({ isLoading: false }))
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
            <FiltersContainer />
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

      await userEvent.type(screen.getByTestId('start-input'), '2025-07-28')

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
            <FiltersContainer />
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

      await userEvent.selectOptions(screen.getByTestId('personnel-select'), 'test.o365-3@franklintn.gov')

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
            <FiltersContainer />
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

      await userEvent.type(screen.getByTestId('search-input'), 'ABC123')

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
            <FiltersContainer />
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

      await userEvent.type(screen.getByTestId('search-input'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))

      await userEvent.click(screen.queryAllByRole('button')[2]) // Clear search value button

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value:'))
    })
  })
})