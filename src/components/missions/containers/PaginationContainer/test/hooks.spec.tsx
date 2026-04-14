import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MissionsProvider } from '../../../context'
import { useHandlePageNav } from '../hooks'

const TestComponent = ({ count }: { count: number }) => {
  const { pageBtnProps, label } = useHandlePageNav(count)

  return (
    <>
      <span data-testid="label">{label}</span>
      <button type="button" data-testid="prev" {...pageBtnProps.prevPageBtnProps}>Prev</button>
      <button type="button" data-testid="next" {...pageBtnProps.nextPageBtnProps}>Next</button>
    </>
  )
}

describe('useHandlePageNav', () => {
  it('should start on page 1', async () => {
    render(
      <MissionsProvider>
        <TestComponent count={50} />
      </MissionsProvider>
    )

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Page 1'))
  })

  it('should disable prev button on page 1', async () => {
    render(
      <MissionsProvider>
        <TestComponent count={50} />
      </MissionsProvider>
    )

    await waitFor(() => expect(screen.getByTestId('prev')).toBeDisabled())
  })

  it('should advance to next page when next button is clicked', async () => {
    render(
      <MissionsProvider>
        <TestComponent count={250} />
      </MissionsProvider>
    )

    await userEvent.click(screen.getByTestId('next'))
    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('Page 2'))
  })

  it('should calculate totalPages from count', async () => {
    render(
      <MissionsProvider>
        <TestComponent count={250} />
      </MissionsProvider>
    )

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('/ 10'))
  })

  it('should show 1 total page when count is 25 or less', async () => {
    render(
      <MissionsProvider>
        <TestComponent count={25} />
      </MissionsProvider>
    )

    await waitFor(() => expect(screen.getByTestId('label')).toHaveTextContent('/ 1'))
  })
})
