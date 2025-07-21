import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetVehicleRegistrations = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getVehicleRegistrations', () => AppActions.getRosterVehicles(authHeaders(token)), { enabled: enabled && !!token })
}