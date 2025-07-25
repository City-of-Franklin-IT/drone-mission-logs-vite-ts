import { createContext, useReducer } from "react"

// Types
import { ReactNode, Dispatch } from "react"

export type PagesType =
  | 'Entries'
  | 'Create'

type HeaderCtx = {
  dispatch: Dispatch<HeaderAction>
  activePage: PagesType
  expanded: boolean
}

type HeaderState = Omit<HeaderCtx, 'dispatch'>

type HeaderAction =
  | { type: 'SET_ACTIVE_PAGE', payload: PagesType }
  | { type: 'TOGGLE_EXPANDED' }

const initialState: HeaderState = {
  activePage: 'Entries',
  expanded: true
}

const HeaderCtx = createContext<HeaderCtx>({
  ...initialState,
  dispatch: () => null
})

const HeaderReducer = (state: HeaderState, action: HeaderAction) => {

  switch(action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      }
    case 'TOGGLE_EXPANDED':
      return {
        ...state,
        expanded: !state.expanded
      }
    default:
      return state
  }
}

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(HeaderReducer, initialState)

  return (
    <HeaderCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </HeaderCtx.Provider>
  )
}

export default HeaderCtx