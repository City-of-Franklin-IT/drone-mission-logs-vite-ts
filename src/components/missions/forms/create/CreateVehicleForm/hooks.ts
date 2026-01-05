import { useQuery } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"

export const useHandleVehicleRegistrationInput = () => {
  const methods = useCreateMissionCtx()
  
  const { isLoading } = useGetVehicleRegistrations()

  return { methods, isLoading }
}

export const useGetVehicleRegistrations = () => {
  const { enabled, token } = useEnableQuery()

  const department = window.location.hostname === 'pdapps.franklintn.gov' ? 'Police' : 'Fire'
  
  const params = new URLSearchParams()

  params.append('department', String(department))

  const isReady = enabled && !!token && !!department

  return useQuery({ 
    queryKey: ['getVehicleRegistrations'], 
    queryFn: () => AppActions.getRosterVehicles(params, authHeaders(token)), 
    enabled: isReady
  })
}