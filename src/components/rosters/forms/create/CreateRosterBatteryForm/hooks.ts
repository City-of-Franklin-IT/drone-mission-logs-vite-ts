import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterBattery } from './utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create roster battery form methods, cancel button onClick handler, and create roster battery form submit function
**/
export const useHandleCreateRosterBatteryForm = () => {
  const methods = useCreateRosterBattery()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns create roster battery form methods
**/
const useCreateRosterBattery = () => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  return useForm<AppTypes.BatteryRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      batteryName: '',
      registration: batteryRosterFilter
    }
  })
}

/**
* Returns create roster battery form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.BatteryRosterCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateRosterBattery(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getRosterBatteries'] })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}