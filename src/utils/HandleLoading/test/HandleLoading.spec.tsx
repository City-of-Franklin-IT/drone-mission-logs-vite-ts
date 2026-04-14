import { render, screen } from '@testing-library/react'
import HandleLoading from '..'

describe('HandleLoading', () => {
  describe('Rendering', () => {
    it('should render children when isSuccess is true', () => {
      render(
        <HandleLoading isSuccess={true}>
          <span>Content loaded</span>
        </HandleLoading>
      )
      expect(screen.getByText('Content loaded')).toBeInTheDocument()
    })

    it('should render Loading spinner when isSuccess is false', () => {
      render(
        <HandleLoading isSuccess={false}>
          <span>Content loaded</span>
        </HandleLoading>
      )
      expect(screen.queryByText('Content loaded')).not.toBeInTheDocument()
      expect(screen.getByAltText('loading icon')).toBeInTheDocument()
    })
  })
})
