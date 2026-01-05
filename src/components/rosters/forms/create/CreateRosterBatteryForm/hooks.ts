import { useContext, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterBattery } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup } from "@/utils/Toast/Toast"

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

  return useCallback((formData: AppTypes.BatteryRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterBattery(formData, token)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['getRosterBatteries'] })
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, dispatch, queryClient])
}