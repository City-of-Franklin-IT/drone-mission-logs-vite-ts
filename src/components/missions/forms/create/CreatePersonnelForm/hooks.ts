import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"

export const useGetPersonnel = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getRosterPersonnel', () => AppActions.getRosterPersonnel(authHeaders(token)), { enabled: enabled && !!token })
}

export const useHandlePilotSelect = () => {
  const methods = useCreateMissionCtx()
  
  const { isLoading } = useGetPersonnel()

  return { methods, isLoading }
}

export const useHandleSupportPersonnelInput = () => {
  const methods = useCreateMissionCtx()

  const values = methods.getValues(`Personnel.${ 1 }`)

  const visible = !values?._deleted

  const onRemoveBtnClick = () => {
    methods.setValue(`Personnel.${ 1 }._deleted`, true, { shouldDirty: true, shouldValidate: true })
  }

  const removeBtnProps = {
    onClick: onRemoveBtnClick,
    visible: !!values?.email
  }

  return { methods, visible, removeBtnProps }
}

export const useHandlePersonnelOptions = () => {
  const { data, isLoading } = useGetPersonnel()

  const personnel = data?.data || []

  return { isLoading, personnel }
}