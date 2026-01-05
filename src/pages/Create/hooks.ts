import { useParams } from "react-router"
import { createFormMap } from './utils'

/**
* Returns create form component
**/
export const useSetForm = () => {
  const { formtype } = useParams<{ formtype: string }>()

  if(!formtype) return

  const Form = createFormMap.get(formtype)

  return Form
}