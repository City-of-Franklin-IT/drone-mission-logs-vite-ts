import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../UpdateRosterPersonnelForm/hooks"
import { handleUpdateBattery } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns update roster battery form methods, cancel button onClick handler, and update roster battery form submit function
**/
export const useHandleUpdateRosterBatteryForm = (battery: AppTypes.BatteryRosterInterface | undefined) => {
  const methods = useUpdateRosterBattery(battery)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns update roster battery form methods
**/
const useUpdateRosterBattery = (battery: AppTypes.BatteryRosterInterface | undefined) => {

  return useForm<AppTypes.BatteryRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      batteryName: battery?.batteryName,
      uuid: battery?.uuid
    }
  })
}

/**
* Returns update roster battery form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.BatteryRosterCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateBattery(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getRosterBatteries'] })
      queryClient.invalidateQueries({ queryKey: ['getBattery', formData.uuid] })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}