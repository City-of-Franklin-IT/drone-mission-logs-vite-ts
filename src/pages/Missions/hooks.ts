import { useQuery } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { setParams } from "./utils"

/**
* Get missions by department from server
**/
export const useGetMissions = () => {
  const { enabled, token } = useEnableQuery()

  const department = window.location.hostname === 'pdapps.franklintn.gov' ? 'Police' : 'Fire'

  const params = setParams(department)

  const isReady = enabled && !!token && !!department && !!params

  return useQuery({
    queryKey: ['getMissions', department],
    queryFn: () => AppActions.getMissions(params!, authHeaders(token)),
    enabled: isReady
  })
}