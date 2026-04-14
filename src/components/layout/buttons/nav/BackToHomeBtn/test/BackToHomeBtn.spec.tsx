import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import BackToHomeBtn from '..'

describe('BackToHomeBtn', () => {
  describe('Rendering', () => {
    it('should render a link with "Back To Home" text', () => {
      render(
        <MemoryRouter>
          <BackToHomeBtn />
        </MemoryRouter>
      )
      expect(screen.getByText(/back to home/i)).toBeInTheDocument()
    })

    it('should link to /missions', () => {
      render(
        <MemoryRouter>
          <BackToHomeBtn />
        </MemoryRouter>
      )
      expect(screen.getByRole('link')).toHaveAttribute('href', '/missions')
    })
  })
})
