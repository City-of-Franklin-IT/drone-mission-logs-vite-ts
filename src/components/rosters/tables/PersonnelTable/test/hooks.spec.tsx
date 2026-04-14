import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RostersCtx, { RostersProvider } from '../../../context'
import { useOnTableRowClick, useHandleTableRow } from '../hooks'

const makePersonnelRoster = (overrides = {}) => ({
  uuid: 'roster-uuid-1',
  email: 'john.doe@example.com',
  department: 'Fire' as const,
  Personnel: [],
  createdBy: 'user',
  createdAt: '2025-06-15T00:00:00Z',
  updatedBy: 'user',
  updatedAt: '2025-06-15T00:00:00Z',
  ...overrides
})

const makePersonnelEntry = (missionOverride = {}) => ({
  uuid: 'p-uuid-1',
  parentId: 'roster-uuid-1',
  email: 'john.doe@example.com',
  isPilot: null,
  createdBy: 'user',
  createdAt: '',
  updatedBy: 'user',
  updatedAt: '',
  Mission: { uuid: 'm-1', ...missionOverride }
})

describe('useOnTableRowClick', () => {
  it('dispatches SET_FORM_TYPE and SET_FORM_UUID to context when onClick is called', async () => {
    const TestComponent = () => {
      const { formType, formUUID } = useContext(RostersCtx)
      const onClick = useOnTableRowClick('personnel', 'test-uuid')

      return (
        <>
          <span data-testid="form-type">{formType ?? ''}</span>
          <span data-testid="form-uuid">{formUUID}</span>
          <button type="button" onClick={onClick}>Click me</button>
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
      expect(screen.getByTestId('form-type')).toHaveTextContent('personnel')
      expect(screen.getByTestId('form-uuid')).toHaveTextContent('test-uuid')
    })
  })
})

describe('useHandleTableRow', () => {
  it('returns correct missionsCount when Personnel array is present', () => {
    const tableData = makePersonnelRoster({
      Personnel: [makePersonnelEntry(), makePersonnelEntry()]
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

  it('returns "-" missionsCount when Personnel is not an array', () => {
    const tableData = makePersonnelRoster({ Personnel: undefined })

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

  it('applies even-row bg class for index 0', () => {
    const tableData = makePersonnelRoster()

    const TestComponent = () => {
      const { trProps } = useHandleTableRow({ tableData: tableData as any, index: 0 })
      return <tr data-testid="row" {...trProps} />
    }

    render(
      <RostersProvider>
        <table><tbody><TestComponent /></tbody></table>
      </RostersProvider>
    )

    expect(screen.getByTestId('row').className).toContain('bg-neutral/20')
  })

  it('does not apply even-row bg class for index 1 (odd)', () => {
    const tableData = makePersonnelRoster()

    const TestComponent = () => {
      const { trProps } = useHandleTableRow({ tableData: tableData as any, index: 1 })
      return <tr data-testid="row" className={trProps.className ?? ''} />
    }

    render(
      <RostersProvider>
        <table><tbody><TestComponent /></tbody></table>
      </RostersProvider>
    )

    expect(screen.getByTestId('row').className).not.toContain('bg-neutral/20')
  })
})
