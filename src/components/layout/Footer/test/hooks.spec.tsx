import { render, screen } from '@testing-library/react'
import { useShowDocsBtn } from '../hooks'

vi.mock('@/helpers/hooks', () => ({ useActiveAccount: vi.fn() }))

import { useActiveAccount } from '@/helpers/hooks'

const mockedUseActiveAccount = vi.mocked(useActiveAccount)

describe('useShowDocsBtn', () => {
  it('should return show as truthy when useActiveAccount returns an account object', () => {
    mockedUseActiveAccount.mockReturnValue({ username: 'test@test.com' } as never)

    const TestComponent = () => {
      const { show } = useShowDocsBtn()
      return <span data-testid="show">{show ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('show')).toHaveTextContent('true')
  })

  it('should return show as falsy when useActiveAccount returns null', () => {
    mockedUseActiveAccount.mockReturnValue(null as never)

    const TestComponent = () => {
      const { show } = useShowDocsBtn()
      return <span data-testid="show">{show ? 'true' : 'false'}</span>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('show')).toHaveTextContent('false')
  })
})
