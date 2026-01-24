import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create roster personnel form methods, cancel button onClick handler, and create roster personnel form submit function
**/
export const useHandleCreateRosterPersonnelForm = () => {
  const methods = useCreateRosterPersonnel()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns create roster personnel form methods
**/
const useCreateRosterPersonnel = () => {
  const department = window.location.hostname === 'pdapps.franklintn.gov' ?
    'Police' :
    'Fire'
  
  const form = useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      department: undefined
    }
  })

  useEffect(() => {
    if(department) {
      form.setValue('department', department)
    }
  }, [department, form])

  return form
}

/**
* Returns create roster personnel form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateRosterPersonnel(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}