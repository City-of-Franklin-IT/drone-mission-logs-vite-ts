import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MissionsProvider } from "../../context"
import { useHandlePageNav } from "./hooks"

describe('PaginationContainer', () => {

  describe('useHandlePageNav', () => {
    it('Returns prev and next page button props and label', async () => {
      const TestComponent = () => {
        const { pageBtnProps, label } = useHandlePageNav(250)

        return (
          <>
            <button
              type="button"
              { ...pageBtnProps.prevPageBtnProps }>
                Prev
            </button>
            <button
              type="button"
              { ...pageBtnProps.nextPageBtnProps }>
                Next
            </button>
            <span>{label}</span>
          </>
        )
      }

      render(
        <MissionsProvider>
          <TestComponent />
        </MissionsProvider>
      )

      await userEvent.click(screen.getAllByRole('button').pop()!)

      await waitFor(() => expect(screen.getByText('Page 2 / 10')).toBeInTheDocument())
    })
  })
})