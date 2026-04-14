import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import MissionsCtx, { MissionsProvider } from '../../../context'
import { useSetTableData } from '../hooks'

const makeMission = (overrides = {}) => ({
  uuid: 'uuid-1',
  missionDate: '2025-06-15',
  missionDescription: 'Test mission',
  location: 'Franklin',
  department: 'Fire' as const,
  incidentNumber: null,
  Personnel: [],
  createdBy: 'user',
  createdAt: '2025-06-15T00:00:00Z',
  updatedBy: 'user',
  updatedAt: '2025-06-15T00:00:00Z',
  ...overrides
})

const TestComponent = ({ missions }: { missions: ReturnType<typeof makeMission>[] }) => {
  const { tableData, filteredCount } = useSetTableData(missions as any)
  return (
    <>
      <span data-testid="count">{filteredCount}</span>
      <span data-testid="table-count">{tableData.length}</span>
    </>
  )
}

const FilteringTestComponent = ({
  missions,
  dispatchFn
}: {
  missions: ReturnType<typeof makeMission>[]
  dispatchFn: (dispatch: ReturnType<typeof useContext<typeof MissionsCtx>['dispatch']>) => void
}) => {
  const { dispatch } = useContext(MissionsCtx)
  const { tableData, filteredCount } = useSetTableData(missions as any)

  return (
    <>
      <button type="button" onClick={() => dispatchFn(dispatch)}>Apply Filter</button>
      <span data-testid="count">{filteredCount}</span>
      <span data-testid="table-count">{tableData.length}</span>
    </>
  )
}

describe('useSetTableData', () => {
  it('returns all missions (up to 25) when no filters are set', () => {
    const missions = Array.from({ length: 10 }, (_, i) =>
      makeMission({ uuid: `uuid-${i}`, missionDescription: `Mission ${i}` })
    )

    render(
      <MissionsProvider>
        <TestComponent missions={missions} />
      </MissionsProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('10')
    expect(screen.getByTestId('table-count')).toHaveTextContent('10')
  })

  it('paginates to 25 items per page when more than 25 missions exist', () => {
    const missions = Array.from({ length: 30 }, (_, i) =>
      makeMission({ uuid: `uuid-${i}`, missionDescription: `Mission ${i}` })
    )

    render(
      <MissionsProvider>
        <TestComponent missions={missions} />
      </MissionsProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('30')
    expect(screen.getByTestId('table-count')).toHaveTextContent('25')
  })

  it('filters by date range when dateRangeFilter start and end are set', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const missions = [
      makeMission({ uuid: 'uuid-1', missionDate: '2025-05-01' }),
      makeMission({ uuid: 'uuid-2', missionDate: '2025-06-15' }),
      makeMission({ uuid: 'uuid-3', missionDate: '2025-07-20' })
    ]

    const applyFilter = (dispatch: any) => {
      dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '2025-06-01' })
      dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '2025-06-30' })
    }

    render(
      <MissionsProvider>
        <FilteringTestComponent missions={missions} dispatchFn={applyFilter} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1')
      expect(screen.getByTestId('table-count')).toHaveTextContent('1')
    })
  })

  it('filters by personnelFilter when set', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const missions = [
      makeMission({
        uuid: 'uuid-1',
        Personnel: [{ email: 'john@example.com', uuid: 'p1', parentId: 'uuid-1', isPilot: null, createdBy: 'user', createdAt: '', updatedBy: 'user', updatedAt: '' }]
      }),
      makeMission({ uuid: 'uuid-2', Personnel: [] }),
      makeMission({
        uuid: 'uuid-3',
        Personnel: [{ email: 'jane@example.com', uuid: 'p2', parentId: 'uuid-3', isPilot: null, createdBy: 'user', createdAt: '', updatedBy: 'user', updatedAt: '' }]
      })
    ]

    const applyFilter = (dispatch: any) => {
      dispatch({ type: 'SET_PERSONNEL_FILTER', payload: 'john@example.com' })
    }

    render(
      <MissionsProvider>
        <FilteringTestComponent missions={missions} dispatchFn={applyFilter} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1')
    })
  })

  it('filters by searchValue case-insensitively when set', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const missions = [
      makeMission({ uuid: 'uuid-1', missionDescription: 'Search target ABC' }),
      makeMission({ uuid: 'uuid-2', missionDescription: 'Unrelated mission' }),
      makeMission({ uuid: 'uuid-3', missionDescription: 'Another abc mention' })
    ]

    const applyFilter = (dispatch: any) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: 'abc' })
    }

    render(
      <MissionsProvider>
        <FilteringTestComponent missions={missions} dispatchFn={applyFilter} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2')
    })
  })

  it('returns filteredCount equal to the number of filtered missions', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const missions = Array.from({ length: 30 }, (_, i) =>
      makeMission({ uuid: `uuid-${i}`, missionDescription: i < 5 ? 'match me' : 'other' })
    )

    const applyFilter = (dispatch: any) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: 'match me' })
    }

    render(
      <MissionsProvider>
        <FilteringTestComponent missions={missions} dispatchFn={applyFilter} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('5')
      expect(screen.getByTestId('table-count')).toHaveTextContent('5')
    })
  })

  it('paginates to the correct slice when currentPage is greater than 1', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const missions = Array.from({ length: 30 }, (_, i) =>
      makeMission({ uuid: `uuid-${i}`, missionDescription: `Mission ${i}` })
    )

    const applyFilter = (dispatch: any) => {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 2 })
    }

    render(
      <MissionsProvider>
        <FilteringTestComponent missions={missions} dispatchFn={applyFilter} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('30')
      expect(screen.getByTestId('table-count')).toHaveTextContent('5')
    })
  })
})
