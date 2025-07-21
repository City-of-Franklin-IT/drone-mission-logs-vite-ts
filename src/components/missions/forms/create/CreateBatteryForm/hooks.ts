import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetBatteries = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getRosterBatteries', () => AppActions.getRosterBatteries(authHeaders(token)), { enabled: enabled && !!token })
}