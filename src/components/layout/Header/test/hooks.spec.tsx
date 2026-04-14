import { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import HeaderCtx, { HeaderProvider } from '../context'
import { useSetActivePage } from '../hooks'

const TestComponent = () => {
  useSetActivePage()
  const { activePage } = useContext(HeaderCtx)
  return <span data-testid="page">{activePage}</span>
}

describe('useSetActivePage', () => {
  it('should set activePage to "Missions" when pathname is "/missions"', async () => {
    render(
      <MemoryRouter initialEntries={['/missions']}>
        <HeaderProvider>
          <TestComponent />
        </HeaderProvider>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId('page')).toHaveTextContent('Missions'))
  })

  it('should set activePage to "Create Mission" when pathname is "/create/mission"', async () => {
    render(
      <MemoryRouter initialEntries={['/create/mission']}>
        <HeaderProvider>
          <TestComponent />
        </HeaderProvider>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId('page')).toHaveTextContent('Create Mission'))
  })

  it('should set activePage to "Manage Rosters" when pathname is "/rosters"', async () => {
    render(
      <MemoryRouter initialEntries={['/rosters']}>
        <HeaderProvider>
          <TestComponent />
        </HeaderProvider>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId('page')).toHaveTextContent('Manage Rosters'))
  })

  it('should set activePage to "Login" for an unrecognized pathname', async () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <HeaderProvider>
          <TestComponent />
        </HeaderProvider>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId('page')).toHaveTextContent('Login'))
  })
})
