import { useContext, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import MissionsCtx from "../../context"

export const useGetMission = () => {
  const { missionUUID } = useContext(MissionsCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({ 
    queryKey: ['getMission', missionUUID], 
    queryFn: () => AppActions.getMission(missionUUID, authHeaders(token)), 
    enabled: enabled && !!token && !!missionUUID 
  })
}

export const useScrollToRef = () => {
  const { missionUUID } = useContext(MissionsCtx)

  const formRef = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    if(formRef.current && missionUUID) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [formRef, missionUUID])

  return formRef
}