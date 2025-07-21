import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetMissions = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getMissions', () => AppActions.getMissions(authHeaders(token)), { enabled: enabled && !!token })
}