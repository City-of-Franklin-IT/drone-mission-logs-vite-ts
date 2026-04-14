import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RostersCtx, { RostersProvider } from '../../../context'
import { useHandleTableRow } from '../hooks'

vi.mock('@/components/missions/tables/MissionsTable/hooks', () => ({
  useSetColumnVisibility: vi.fn(() => true)
}))

const makeVehicleRoster = (overrides = {}) => ({
  uuid: 'vehicle-uuid-1',
  model: 'DJI Mavic 3',
  registration: 'N123AB',
  department: 'Fire' as const,
  createdBy: 'user',
  createdAt: '2025-06-15T00:00:00Z',
  updatedBy: 'user',
  updatedAt: '2025-06-15T00:00:00Z',
  ...overrides
})

const makeVehicleEntry = () => ({
  uuid: 'v-uuid-1',
  parentId: 'vehicle-uuid-1',
  registration: 'N123AB',
  createdBy: 'user',
  createdAt: '',
  updatedBy: 'user',
  updatedAt: '',
  Mission: { uuid: 'm-1' }
})

describe('useHandleTableRow (VehiclesTable)', () => {
  it('returns missionsCount equal to the length of Vehicles when it is an array', () => {
    const tableData = makeVehicleRoster({
      Vehicles: [makeVehicleEntry(), makeVehicleEntry()]
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

    expect(screen.getByTestId('count')).toHaveTextContent('2')
  })

  it('returns "-" for missionsCount when Vehicles is undefined', () => {
    const tableData = makeVehicleRoster({ Vehicles: undefined })

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

  it('dispatches SET_FORM_TYPE and SET_FORM_UUID when trProps.onClick is called', async () => {
    const tableData = makeVehicleRoster()

    const TestComponent = () => {
      const { formType, formUUID } = useContext(RostersCtx)
      const { trProps } = useHandleTableRow({ tableData: tableData as any, index: 0 })

      return (
        <>
          <span data-testid="form-type">{formType ?? ''}</span>
          <span data-testid="form-uuid">{formUUID}</span>
          <button type="button" onClick={trProps.onClick}>Click row</button>
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
      expect(screen.getByTestId('form-type')).toHaveTextContent('vehicle')
      expect(screen.getByTestId('form-uuid')).toHaveTextContent('vehicle-uuid-1')
    })
  })
})
