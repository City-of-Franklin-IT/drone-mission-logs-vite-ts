import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateBattery } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateRosterBattery = (battery: AppTypes.BatteryRosterInterface | undefined) => {

  return useForm<AppTypes.BatteryRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      batteryName: battery?.batteryName,
      uuid: battery?.uuid
    }
  })
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.BatteryRosterCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateBattery(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterBatteries')
        queryClient.invalidateQueries(['getRosterBattery', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}