import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import MissionsCtx, { MissionsProvider } from '../../../context'
import FiltersContainer from '..'

vi.mock('../../../forms/create/CreatePersonnelForm/hooks', () => ({
  useGetPersonnel: vi.fn(() => ({ isLoading: false, isSuccess: true }))
}))

vi.mock('../../../forms/create/CreatePersonnelForm/components', () => ({
  PersonnelOptions: () => <><option value="user@test.com">user@test.com</option></>
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <MissionsProvider>
      {children}
    </MissionsProvider>
  </MemoryRouter>
)

describe('FiltersContainer', () => {
  it('renders nothing when visible is false', () => {
    render(
      <Wrapper>
        <FiltersContainer visible={false} />
      </Wrapper>
    )

    expect(screen.queryByPlaceholderText('by mission description..')).not.toBeInTheDocument()
  })

  it('renders search input when visible is true', () => {
    render(
      <Wrapper>
        <FiltersContainer visible={true} />
      </Wrapper>
    )

    expect(screen.getByPlaceholderText('by mission description..')).toBeInTheDocument()
  })

  it('typing in the search input updates searchValue in context', async () => {
    const TestComponent = () => {
      const { searchValue } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="search-value">{searchValue}</span>
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

    const input = screen.getByPlaceholderText('by mission description..')
    await userEvent.type(input, 'test mission')

    await waitFor(() =>
      expect(screen.getByTestId('search-value')).toHaveTextContent('test mission')
    )
  })

  it('date range start input updates dateRangeFilter.start in context', async () => {
    const TestComponent = () => {
      const { dateRangeFilter } = useContext(MissionsCtx)

      return (
        <>
          <span data-testid="start-value">{dateRangeFilter.start}</span>
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

    const dateInputs = screen.getAllByTestId('date-range-input')
    const startInput = dateInputs[0]

    await userEvent.type(startInput, '2025-01-15')

    await waitFor(() =>
      expect(screen.getByTestId('start-value')).toHaveTextContent('2025-01-15')
    )
  })
})
