import { useContext, useEffect } from "react"
import { MemoryRouter } from "react-router"
import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MissionsCtx, { MissionsProvider } from "../../context"

// Components
import PaginationContainer from "."

const TestComponent = () => {
  const { currentPage, dispatch } = useContext(MissionsCtx)

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: 10 })
  }, [])

  return (
    <>
      <span data-testid="test-span">Current Page: {currentPage}</span>
      <PaginationContainer />
    </>
  )
}

describe('PaginationContainer', () => {
  it('Updates currentPage in MissionsCtx on change', async () => {
    render(
      <MemoryRouter>
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      </MemoryRouter>
    )

    await userEvent.click(screen.getByTestId('next-page-btn')) // Next page btn

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 2'))

    await userEvent.click(screen.getByTestId('prev-page-btn')) // Prev page btn

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 1'))
  })

  it('Renders the correct label', async () => {
    render(
      <MemoryRouter>
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId('page-nav-label')).toHaveTextContent(`Page 1 / 10`)
  })
})