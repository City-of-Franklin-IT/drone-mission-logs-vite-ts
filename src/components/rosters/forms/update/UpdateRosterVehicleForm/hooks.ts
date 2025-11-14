import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { errorPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../UpdateRosterPersonnelForm/hooks"
import { handleUpdateVehicle } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleUpdateRosterVehicleForm = (vehicle: AppTypes.VehicleRosterInterface | undefined) => {
  const methods = useUpdateRosterVehicle(vehicle)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

export const useUpdateRosterVehicle = (vehicle: AppTypes.VehicleRosterInterface | undefined) => {

  return useForm<AppTypes.VehicleRosterInterface>({
    mode: 'onBlur',
    defaultValues: {
      model: vehicle?.model,
      registration: vehicle?.registration,
      uuid: vehicle?.uuid
    }
  })
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.VehicleRosterCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateVehicle(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterVehicles')
        queryClient.invalidateQueries(['getRosterVehicle', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}