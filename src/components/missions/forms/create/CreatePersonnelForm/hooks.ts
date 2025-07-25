import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetPersonnel = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getRosterPersonnel', () => AppActions.getRosterPersonnel(authHeaders(token)), { enabled: enabled && !!token })
}