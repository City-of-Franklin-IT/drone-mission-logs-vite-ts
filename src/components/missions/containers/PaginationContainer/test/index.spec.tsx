import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MissionsProvider } from '../../../context'
import PaginationContainer from '..'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MissionsProvider>
    {children}
  </MissionsProvider>
)

describe('PaginationContainer', () => {
  it('renders Prev and Next buttons', async () => {
    render(
      <Wrapper>
        <PaginationContainer count={250} />
      </Wrapper>
    )

    expect(await screen.findByTestId('prev-page-btn')).toBeInTheDocument()
    expect(await screen.findByTestId('next-page-btn')).toBeInTheDocument()
  })

  it('shows initial label "Page 1 / 10" when count is 250', async () => {
    render(
      <Wrapper>
        <PaginationContainer count={250} />
      </Wrapper>
    )

    await waitFor(() =>
      expect(screen.getByText(/page 1 \/ 10/i)).toBeInTheDocument()
    )
  })

  it('clicking the Next button advances to "Page 2 / 10"', async () => {
    render(
      <Wrapper>
        <PaginationContainer count={250} />
      </Wrapper>
    )

    const nextBtn = await screen.findByTestId('next-page-btn')

    await waitFor(() =>
      expect(screen.getByText(/page 1 \/ 10/i)).toBeInTheDocument()
    )

    await userEvent.click(nextBtn)

    await waitFor(() =>
      expect(screen.getByText(/page 2 \/ 10/i)).toBeInTheDocument()
    )
  })

  it('Prev button is disabled on page 1', async () => {
    render(
      <Wrapper>
        <PaginationContainer count={250} />
      </Wrapper>
    )

    const prevBtn = await screen.findByTestId('prev-page-btn')

    await waitFor(() => expect(prevBtn).toBeDisabled())
  })
})
