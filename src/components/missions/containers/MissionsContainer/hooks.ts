import { useContext, useEffect } from "react"
import { useQuery } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import MissionsCtx from "../../context"

export const useGetMission = () => {
  const { missionUUID } = useContext(MissionsCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getMission', missionUUID], () => AppActions.getMission(missionUUID, authHeaders(token)), { enabled: enabled && !!token && !!missionUUID })
}

export const useScrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  const { missionUUID } = useContext(MissionsCtx)

  useEffect(() => {
    if(ref.current && missionUUID) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [ref, missionUUID])
}