import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterBattery } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup } from "@/utils/Toast/Toast"

export const useHandleCreateRosterBatteryForm = () => {
  const methods = useCreateRosterBattery()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

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

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.BatteryRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterBattery(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterBatteries')
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, dispatch, queryClient])
}