import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdatePersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns update roster personnel form methods, cancel button onClick handler, and update roster personnel form submit function
**/
export const useHandleUpdateRosterPersonnelForm = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {
  const methods = useUpdateRosterPersonnel(personnel)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns cancel button onClick handler
**/
export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(RostersCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

/**
* Returns update roster personnel form methods
**/
const useUpdateRosterPersonnel = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {

  return useForm<AppTypes.PersonnelRosterInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: personnel?.email,
      uuid: personnel?.uuid
    }
  })
}

/**
* Returns update roster personnel form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return async (formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdatePersonnel(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
      queryClient.invalidateQueries({ queryKey: ['getPerson', formData.uuid] })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}