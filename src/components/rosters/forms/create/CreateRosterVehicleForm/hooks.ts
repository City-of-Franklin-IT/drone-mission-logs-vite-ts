import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterVehicle } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create roster vehicle form methods, cancel button onClick handler, and create roster vechicle form submit function
**/
export const useHandleCreateRosterVehicleForm = () => {
  const methods = useCreateRosterVehicle()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns create roster vehicle form methods
**/
const useCreateRosterVehicle = () => {
  const department = window.location.hostname === 'pdapps.franklintn.gov' ?
    'Police' :
    'Fire'

  const form = useForm<AppTypes.VehicleRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      model: '',
      registration: ''
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
* Returns create roster vehicle form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.VehicleRosterCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateRosterVehicle(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getRosterVehicles'] })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}