import { render } from '@testing-library/react'
import { useRedirect } from '../hooks'

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}))

vi.mock('@/helpers/hooks', () => ({
  useActiveAccount: vi.fn()
}))

import { useNavigate } from 'react-router'
import { useActiveAccount } from '@/helpers/hooks'

describe('useRedirect', () => {
  it('should call navigate("/missions") when activeAccount is truthy', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useActiveAccount).mockReturnValue(true)

    const TestComponent = () => {
      useRedirect()
      return null
    }

    render(<TestComponent />)

    expect(mockNavigate).toHaveBeenCalledWith('/missions')
  })

  it('should set window.location.href to "/" when activeAccount is falsy', () => {
    Object.defineProperty(window, 'location', { value: { href: '' }, writable: true })

    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useActiveAccount).mockReturnValue(false)

    const TestComponent = () => {
      useRedirect()
      return null
    }

    render(<TestComponent />)

    expect(window.location.href).toBe('/')
  })
})
