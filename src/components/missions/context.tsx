import { createContext, useReducer } from "react"

// Types
import { ReactNode, Dispatch } from "react"

type MissionsCtx = {
  dispatch: Dispatch<MissionsAction>
  dateRangeFilter: {
    start: string
    end: string
  },
  missionUUID: string
  personnelFilter: string
}

type MissionsState = Omit<MissionsCtx, 'dispatch'>

type MissionsAction =
  | { type: 'SET_MISSION_UUID', payload: string }
  | { type: 'SET_DATE_RANGE_FILTER_START', payload: string }
  | { type: 'SET_DATE_RANGE_FILTER_END', payload: string }
  | { type: 'SET_PERSONNEL_FILTER', payload: string }
  | { type: 'RESET_CTX' }

const initialState: MissionsState = {
  dateRangeFilter: {
    start: '',
    end: ''
  },
  missionUUID: '',
  personnelFilter: ''
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
    case 'SET_DATE_RANGE_FILTER_START':
      return {
        ...state,
        dateRangeFilter: {
          start: action.payload,
          end: state.dateRangeFilter.end
        }
      }
    case 'SET_DATE_RANGE_FILTER_END':
      return {
        ...state,
        dateRangeFilter: {
          start: state.dateRangeFilter.start,
          end: action.payload
        }
      }
    case 'SET_PERSONNEL_FILTER':
      return {
        ...state,
        personnelFilter: action.payload
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