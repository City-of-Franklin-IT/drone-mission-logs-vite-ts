import { render, screen } from '@testing-library/react'
import Loading from '..'

describe('Loading', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Loading />)
    })

    it('should render an img with alt text "loading icon"', () => {
      render(<Loading />)
      expect(screen.getByAltText('loading icon')).toBeInTheDocument()
    })
  })
})
