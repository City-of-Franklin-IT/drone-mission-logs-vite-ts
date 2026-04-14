import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { MissionsProvider } from '../../../context'
import MissionsTable from '..'
import * as MockAPI from '@/test/mocks/api'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <MissionsProvider>
      {children}
    </MissionsProvider>
  </MemoryRouter>
)

describe('MissionsTable', () => {
  it('renders "No Missions" when tableData is empty', () => {
    render(
      <Wrapper>
        <MissionsTable tableData={[]} />
      </Wrapper>
    )

    expect(screen.getByText(/no missions/i)).toBeInTheDocument()
  })

  it('renders table rows when tableData has items', () => {
    const missions = [
      MockAPI.createMockMission(),
      MockAPI.createMockMission()
    ]

    render(
      <Wrapper>
        <MissionsTable tableData={missions} />
      </Wrapper>
    )

    for(const mission of missions) {
      expect(screen.getByText(mission.missionDate)).toBeInTheDocument()
    }
  })

  it('clicking the show-details-btn reveals mission-details', async () => {
    const mission = MockAPI.createMockMission()

    render(
      <Wrapper>
        <MissionsTable tableData={[mission]} />
      </Wrapper>
    )

    expect(screen.queryByTestId('mission-details')).not.toBeInTheDocument()

    const detailsBtn = screen.getByTestId('show-details-btn')
    await userEvent.click(detailsBtn)

    await waitFor(() =>
      expect(screen.getByTestId('mission-details')).toBeInTheDocument()
    )
  })
})
