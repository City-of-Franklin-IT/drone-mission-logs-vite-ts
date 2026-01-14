import { useQueries } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

/**
* Returns roster data by department from server
**/
export const useGetRosters = () => {
  const { enabled, token } = useEnableQuery()

  const department = window.location.hostname === 'pdapps.franklintn.gov' ?
    'Police' :
    'Fire'

  const params = new URLSearchParams()

  params.append('department', String(department))

  const results = useQueries({
    queries: [
      { queryKey: ['getRosterPersonnel'], queryFn: () => AppActions.getRosterPersonnel(params, authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token && !!department },
      { queryKey: ['getRosterVehicles'], queryFn: () => AppActions.getRosterVehicles(params, authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token && !!department },
      { queryKey: ['getRosterBatteries'], queryFn: () => AppActions.getRosterBatteries(authHeaders(token)), staleTime: Infinity, enabled: enabled && !!token }
    ]
  })

  const isSuccess = results[0].isSuccess && results[1].isSuccess && results[2].isSuccess

  return { personnel: results[0].data?.data || [], vehicles: results[1].data?.data || [], batteries: results[2].data?.data || [], isSuccess }
}