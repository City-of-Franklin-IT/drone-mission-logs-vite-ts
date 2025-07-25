import { useCallback, useContext } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateRosterPersonnel = () => {

  return useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    }
  })
}

export const useHandleFormSubmit = () => {
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