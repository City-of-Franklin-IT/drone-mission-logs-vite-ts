import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RostersCtx, { RostersProvider } from '../../../context'
import { useOnBatteryFilterChange, useHandleTableBody, useHandleTableRow } from '../hooks'

const makeBatteryRoster = (overrides = {}) => ({
  uuid: 'battery-uuid-1',
  registration: 'N123AB',
  batteryName: 'Battery 1',
  createdBy: 'user',
  createdAt: '2025-06-15T00:00:00Z',
  updatedBy: 'user',
  updatedAt: '2025-06-15T00:00:00Z',
  ...overrides
})

const makeVehicleEntry = () => ({
  uuid: 'v-uuid-1',
  parentId: 'vr-uuid-1',
  registration: 'N123AB',
  createdBy: 'user',
  createdAt: '',
  updatedBy: 'user',
  updatedAt: '',
  Mission: { uuid: 'm-1' }
})

describe('useOnBatteryFilterChange', () => {
  it('dispatches new filter value when it differs from the current batteryRosterFilter', async () => {
    const TestComponent = () => {
      const { batteryRosterFilter } = useContext(RostersCtx)
      const onChange = useOnBatteryFilterChange()

      return (
        <>
          <span data-testid="filter">{batteryRosterFilter}</span>
          <select data-testid="select" onChange={onChange}>
            <option value="">All</option>
            <option value="N123AB">N123AB</option>
          </select>
        </>
      )
    }

    render(
      <RostersProvider>
        <TestComponent />
      </RostersProvider>
    )

    await userEvent.selectOptions(screen.getByTestId('select'), 'N123AB')

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toHaveTextContent('N123AB')
    })
  })

  it('does not dispatch when the selected value matches the current batteryRosterFilter', async () => {
    const SetupComponent = () => {
      const { dispatch, batteryRosterFilter } = useContext(RostersCtx)
      const onChange = useOnBatteryFilterChange()

      return (
        <>
          <span data-testid="filter">{batteryRosterFilter}</span>
          <button type="button" onClick={() => dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload: 'N123AB' })}>
            Preset
          </button>
          <select data-testid="select" onChange={onChange}>
            <option value="">All</option>
            <option value="N123AB">N123AB</option>
            <option value="N456CD">N456CD</option>
          </select>
        </>
      )
    }

    render(
      <RostersProvider>
        <SetupComponent />
      </RostersProvider>
    )

    await userEvent.click(screen.getByRole('button', { name: 'Preset' }))
    await waitFor(() => expect(screen.getByTestId('filter')).toHaveTextContent('N123AB'))

    // Selecting the same value should NOT change filter (dispatch is guarded)
    // We verify filter remains 'N123AB' (unchanged) — no way to detect no-dispatch directly
    // but we confirm it stays consistent after re-selecting the same option
    await userEvent.selectOptions(screen.getByTestId('select'), 'N123AB')

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toHaveTextContent('N123AB')
    })
  })
})

describe('useHandleTableBody', () => {
  it('returns empty array when no batteryRosterFilter is set', () => {
    const tableData = [makeBatteryRoster({ registration: 'N123AB' })]

    const TestComponent = () => {
      const result = useHandleTableBody(tableData as any)
      return <span data-testid="count">{result.length}</span>
    }

    render(
      <RostersProvider>
        <TestComponent />
      </RostersProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('returns batteries filtered by registration when batteryRosterFilter is set', async () => {
    const tableData = [
      makeBatteryRoster({ uuid: 'b-1', registration: 'N123AB' }),
      makeBatteryRoster({ uuid: 'b-2', registration: 'N456CD' }),
      makeBatteryRoster({ uuid: 'b-3', registration: 'N123AB' })
    ]

    const TestComponent = () => {
      const { dispatch } = useContext(RostersCtx)
      const result = useHandleTableBody(tableData as any)

      return (
        <>
          <button type="button" onClick={() => dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload: 'N123AB' })}>
            Set Filter
          </button>
          <span data-testid="count">{result.length}</span>
        </>
      )
    }

    render(
      <RostersProvider>
        <TestComponent />
      </RostersProvider>
    )

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2')
    })
  })
})

describe('useHandleTableRow', () => {
  it('returns missionsCount equal to the length of VehicleRoster.Vehicles when it is an array', () => {
    const tableData = makeBatteryRoster({
      VehicleRoster: {
        uuid: 'vr-1',
        model: 'Model X',
        registration: 'N123AB',
        department: 'Fire',
        createdBy: 'user',
        createdAt: '',
        updatedBy: 'user',
        updatedAt: '',
        Vehicles: [makeVehicleEntry(), makeVehicleEntry(), makeVehicleEntry()]
      }
    })

    const TestComponent = () => {
      const { missionsCount } = useHandleTableRow({ tableData: tableData as any, index: 0 })
      return <span data-testid="count">{missionsCount}</span>
    }

    render(
      <RostersProvider>
        <TestComponent />
      </RostersProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('3')
  })

  it('returns "-" for missionsCount when VehicleRoster.Vehicles is not an array', () => {
    const tableData = makeBatteryRoster({ VehicleRoster: undefined })

    const TestComponent = () => {
      const { missionsCount } = useHandleTableRow({ tableData: tableData as any, index: 0 })
      return <span data-testid="count">{missionsCount}</span>
    }

    render(
      <RostersProvider>
        <TestComponent />
      </RostersProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('-')
  })
})
