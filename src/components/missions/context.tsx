import { createContext, useReducer } from "react"

// Types
import { ReactNode, Dispatch } from "react"

type MissionsCtx = {
  dispatch: Dispatch<MissionsAction>
  missionUUID: string
}

type MissionsState = Omit<MissionsCtx, 'dispatch'>

type MissionsAction =
  | { type: 'SET_MISSION_UUID', payload: string }
  | { type: 'RESET_CTX' }

const initialState: MissionsState = {
  missionUUID: ''
}

const MissionsCtx = createContext<MissionsCtx>({
  ...initialState,
  dispatch: () => null
})

const MissionsReducer = (state: MissionsState, action: MissionsAction) => {
  
  switch(action.type) {
    case 'SET_MISSION_UUID':
      return {
        ...state,
        missionUUID: action.payload
      }
    case 'RESET_CTX':
      return initialState
    default:
      return state
  }
}

export const MissionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(MissionsReducer, initialState)

  return (
    <MissionsCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </MissionsCtx.Provider>
  )
}

export default MissionsCtx