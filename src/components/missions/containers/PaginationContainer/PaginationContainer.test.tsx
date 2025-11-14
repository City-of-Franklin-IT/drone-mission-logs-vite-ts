import { useContext, useEffect } from "react"
import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MissionsCtx, { MissionsProvider } from "../../context"
import { useHandlePageNav } from "./hooks"

describe('PaginationContainer', () => {

  describe('useHandlePageNav', () => {
    it('Returns prev and next page button props and label', async () => {
      const TestComponent = () => {
        const { dispatch } = useContext(MissionsCtx)

        const { prevBtnProps, nextBtnProps, label } = useHandlePageNav()

        useEffect(() => {
          dispatch({ type: 'SET_TOTAL_PAGES', payload: 10 })
        }, [])

        return (
          <>
            <button
              type="button"
              { ...prevBtnProps }>
                Prev
            </button>
            <button
              type="button"
              { ...nextBtnProps }>
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