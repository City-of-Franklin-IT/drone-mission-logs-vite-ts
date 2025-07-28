import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RostersCtx, { RostersProvider } from '../../context'
import { useOnCreateBtnClick } from './hooks'

describe('PersonnelContainer', () => {

  describe('useOnCreateBtnClick', () => {
    it('Updates formType in MissionsCtx on click', async () => {
      const TestComponent = () => {
        const { formType } = useContext(RostersCtx)
        const onClick = useOnCreateBtnClick('personnel')

        return (
          <>
            <span data-testid="test-span">Form Type: {formType}</span>
            <button 
              type="button"
              onClick={onClick}>
                Button
            </button>
          </>
        )
      }

      render(
        <MemoryRouter>
          <RostersProvider>
            <TestComponent />
          </RostersProvider>
        </MemoryRouter>
      )

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Form Type: personnel'))
    })
  })
})