import { useCallback, useContext } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterVehicle } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleCreateRosterVehicleForm = () => {
  const methods = useCreateRosterVehicle()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

const useCreateRosterVehicle = () => {

  return useForm<AppTypes.VehicleRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      model: '',
      registration: ''
    }
  })
}

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.VehicleRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterVehicle(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterVehicles')
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [dispatch, queryClient, enabled, token])
}