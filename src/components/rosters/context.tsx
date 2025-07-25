import { createContext, useReducer } from "react"

// Types
import { ReactNode, Dispatch } from "react"

type RostersCtx = {
  dispatch: Dispatch<RostersAction>
  batteryRosterFilter: string
  formUUID: string
  formType: FormType | null
}

export type FormType = 
  | "personnel"
  | "vehicle"
  | "battery"

type RostersState = Omit<RostersCtx, 'dispatch'>

type RostersAction =
  | { type: 'SET_FORM_UUID', payload: string }
  | { type: 'SET_FORM_TYPE', payload: FormType | null }
  | { type: 'SET_BATTERY_ROSTER_FILTER', payload: string }
  | { type: 'RESET_CTX' }

const initialState: RostersState = {
  batteryRosterFilter: '',
  formUUID: '',
  formType: null
}

const RostersCtx = createContext<RostersCtx>({
  ...initialState,
  dispatch: () => null
})

const RostersReducer = (state: RostersState, action: RostersAction) => {
  
  switch(action.type) {
    case 'SET_FORM_UUID':
      return {
        ...state,
        formUUID: action.payload
      }
    case 'SET_FORM_TYPE':
      return {
        ...state,
        formType: action.payload
      }
    case 'SET_BATTERY_ROSTER_FILTER':
      return {
        ...state,
        batteryRosterFilter: action.payload
      }
    case 'RESET_CTX':
      return {
        ...initialState,
        batteryRosterFilter: state.batteryRosterFilter
      }
    default:
      return state
  }
}

export const RostersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(RostersReducer, initialState)

  return (
    <RostersCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </RostersCtx.Provider>
  )
}

export default RostersCtx