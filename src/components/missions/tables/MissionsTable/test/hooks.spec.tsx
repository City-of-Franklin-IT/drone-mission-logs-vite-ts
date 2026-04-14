import { render, screen, waitFor } from '@testing-library/react'
import { useSetColumnVisibility, useHandleTableRow } from '../hooks'

describe('useSetColumnVisibility', () => {
  it('should return true when window.innerWidth is 1024 or greater', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })

    const TestComponent = () => {
      const visible = useSetColumnVisibility()
      return <span data-testid="result">{visible ? 'visible' : 'hidden'}</span>
    }

    render(<TestComponent />)

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('visible'))
  })

  it('should return false when window.innerWidth is less than 1024', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, writable: true })

    const TestComponent = () => {
      const visible = useSetColumnVisibility()
      return <span data-testid="result">{visible ? 'visible' : 'hidden'}</span>
    }

    render(<TestComponent />)

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('hidden'))
  })
})

describe('useHandleTableRow', () => {
  it('should start with expanded false', () => {
    const TestComponent = () => {
      const { expanded } = useHandleTableRow()
      return <span data-testid="result">{expanded ? 'expanded' : 'collapsed'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('result')).toHaveTextContent('collapsed')
  })

  it('should toggle expanded when onDetailsBtnClick is called', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')

    const TestComponent = () => {
      const { expanded, onDetailsBtnClick } = useHandleTableRow()
      return (
        <>
          <span data-testid="result">{expanded ? 'expanded' : 'collapsed'}</span>
          <button type="button" onClick={onDetailsBtnClick}>Toggle</button>
        </>
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('result')).toHaveTextContent('collapsed')

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('expanded'))
  })
})
