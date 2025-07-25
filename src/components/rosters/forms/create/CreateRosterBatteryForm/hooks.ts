import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { handleCreateRosterBattery } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup } from "@/utils/Toast/Toast"

export const useCreateRosterBattery = () => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  return useForm<AppTypes.BatteryRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      batteryName: '',
      registration: batteryRosterFilter
    }
  })
}

export const useHandleFormSubmit = () => {
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