import { useCallback, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import RostersCtx from "@/components/rosters/context"
import { useEnableQuery, useGetUserDepartment } from "@/helpers/hooks"
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
  const { department } = useGetUserDepartment()
  
  const form = useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      department: undefined
    }
  })

  useEffect(() => {
    if(department) {
      form.setValue('department', department)
    }
  }, [department, form])

  return form
}

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RostersCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterPersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [dispatch, queryClient, enabled, token])
}