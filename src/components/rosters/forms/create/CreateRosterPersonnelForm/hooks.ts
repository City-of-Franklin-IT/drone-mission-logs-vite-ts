import { useCallback, useContext } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { handleCreateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleCreateRosterPersonnelForm = () => {
  const methods = useCreateRosterPersonnel()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

const useCreateRosterPersonnel = () => {

  return useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    }
  })
}

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterPersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterPersonnel')
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [dispatch, queryClient, enabled, token])
}