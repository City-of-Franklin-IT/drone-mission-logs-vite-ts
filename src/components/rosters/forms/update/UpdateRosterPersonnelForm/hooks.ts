import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "@/components/rosters/context"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdatePersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateRosterPersonnel = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {

  return useForm<AppTypes.PersonnelRosterInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: personnel?.email,
      uuid: personnel?.uuid
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(RostersCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleUpdatePersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterPersonnel')
        queryClient.invalidateQueries(['getPerson', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [dispatch, enabled, token, queryClient])
}