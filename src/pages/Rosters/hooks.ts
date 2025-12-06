import { useQueries } from "@tanstack/react-query"
import { useEnableQuery, useGetUserDepartment } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetRosters = () => {
  const { enabled, token } = useEnableQuery()

  const { department, isLoading } = useGetUserDepartment()

  const params = new URLSearchParams()

  params.append('department', String(department))

  const results = useQueries({
    queries: [
      { queryKey: ['getRosterPersonnel'], queryFn: () => AppActions.getRosterPersonnel(params, authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token && !isLoading && !!department },
      { queryKey: ['getRosterVehicles'], queryFn: () => AppActions.getRosterVehicles(params, authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token && !isLoading && !!department },
      { queryKey: ['getRosterBatteries'], queryFn: () => AppActions.getRosterBatteries(authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token }
    ]
  })

  const isSuccess = results[0].isSuccess && results[1].isSuccess && results[2].isSuccess

  return { personnel: results[0].data?.data || [], vehicles: results[1].data?.data || [], batteries: results[2].data?.data || [], isSuccess }
}