import { MemoryRouter } from "react-router"
import { screen, render, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as MockAPI from '@/test/mocks/api'
import { MissionsProvider } from "../../context"
import { useSetColumnVisibility } from "./hooks"
import { setFlightTimes } from './utils'

// Components
import MissionsTable from "."

vi.mock('./hooks', async () => {
  const actual = await vi.importActual('./hooks')
  return {
    ...actual,
    useScrollToMissionDetails: vi.fn(() => ({
      tableRowRef: { current: null },
      detailsRef: { current: null }
    }))
  }
})

const mockMissions = Array.from({ length: 10 }).map(() => MockAPI.createMockMission())

describe('MissionsTable', () => {
  describe('useSetColumnVisibility', () => {
    it('Returns true when window size is 1024px or greater, false when smaller', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 1024 })

      const TestComponent = () => {
        const visibility = useSetColumnVisibility()

        const label = visibility ?
          'Visible' :
          'Hidden'

        return (
          <span data-testid="test-span">{label}</span>
        )
      }

      render(
        <TestComponent />
      )

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Visible'))

      cleanup()

      Object.defineProperty(window, 'innerWidth', { value: 1023 })

      render(
        <TestComponent />
      )

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Hidden'))
    })
  })

  describe('ShowDetailsBtn', () => {
    it('Updates state on click and makes MissionDetails visible', async () => {

      render(
        <MemoryRouter>
          <MissionsProvider>
            <MissionsTable tableData={mockMissions} />
          </MissionsProvider>
        </MemoryRouter>
      )
      
      expect(screen.queryByTestId('mission-details')).not.toBeInTheDocument()

      await userEvent.click(screen.getAllByTestId('show-details-btn')[0])
      await waitFor(() => expect(screen.getByTestId('mission-details')).toBeInTheDocument())
    })
  })

  describe('setFlightTimes', () => {
    it('Returns formatted times and flight duration', () => {
      const mockFlight = MockAPI.createMockFlight({ takeOffDateTime: '2025-07-28T12:00:00.000', landingDateTime: '2025-07-28T12:01:00' })

      const TestComponent = () => {
        const { takeoffTime, landingTime, duration } = setFlightTimes(mockFlight)

        return (
          <>
            <span data-testid="take-off-span">Take Off Time: {takeoffTime}</span>
            <span data-testid="landing-span">Landing Time: {landingTime}</span>
            <span data-testid="duration-span">Duration: {duration}</span>
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

      expect(screen.getByTestId('take-off-span')).toHaveTextContent('Take Off Time: 12:00')
      expect(screen.getByTestId('landing-span')).toHaveTextContent('Landing Time: 12:01')
      expect(screen.getByTestId('duration-span')).toHaveTextContent('Duration: 1 mins')
    })
  })
})