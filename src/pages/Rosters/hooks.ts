import { useQueries } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetRosters = () => {
  const { enabled, token } = useEnableQuery()

  const results = useQueries([
    { queryKey: 'getRosterPersonnel', queryFn: () => AppActions.getRosterPersonnel(authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token },
    { queryKey: 'getRosterVehicles', queryFn: () => AppActions.getRosterVehicles(authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token },
    { queryKey: 'getRosterBatteries', queryFn: () => AppActions.getRosterBatteries(authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token }
  ])

  const isSuccess = results[0].isSuccess && results[1].isSuccess && results[2].isSuccess

  return { personnel: results[0].data?.data || [], vehicles: results[1].data?.data || [], batteries: results[2].data?.data || [], isSuccess }
}