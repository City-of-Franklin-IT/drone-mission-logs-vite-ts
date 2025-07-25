import { useContext } from "react"
import RostersCtx from "../../context"

// Types
import { FormType } from "../../context"

export const useOnTableRowClick = (formType: FormType, uuid: string) => {
  const { dispatch } = useContext(RostersCtx)

  return () => {
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
    dispatch({ type: 'SET_FORM_UUID', payload: uuid })
  }
}