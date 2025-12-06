import { useQuery } from "@tanstack/react-query"
import { useEnableQuery, useGetUserDepartment } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { setParams } from "./utils"

export const useGetMissions = () => {
  const { enabled, token } = useEnableQuery()

  const { department, isLoading } = useGetUserDepartment()

  const params = setParams(department)

  const isReady = enabled && !!token && !isLoading && !!department && !!params

  return useQuery({
    queryKey: ['getMissions', department],
    queryFn: () => AppActions.getMissions(params!, authHeaders(token)),
    enabled: isReady
  })
}