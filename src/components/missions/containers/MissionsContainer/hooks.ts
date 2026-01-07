import { useContext, useEffect, useRef, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import MissionsCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns mission by uuid from server
**/
export const useGetMission = () => {
  const { missionUUID } = useContext(MissionsCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({ 
    queryKey: ['getMission', missionUUID], 
    queryFn: () => AppActions.getMission(missionUUID, authHeaders(token)), 
    enabled: enabled && !!token && !!missionUUID 
  })
}

/**
* Returns form ref; scrolls to ref when available / form is present
**/
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

/**
* Returns paginated mission table data; applies filters when applicable
**/
export const useSetTableData = (missions: AppTypes.MissionInterface[]) => {
  const { dateRangeFilter, personnelFilter, searchValue, currentPage } = useContext(MissionsCtx)

  let missionsArray = missions

  const data = useMemo(() => {
    if(dateRangeFilter.start && dateRangeFilter.end) { // Date range filter
      const startDate = new Date(dateRangeFilter.start)
      const endDate = new Date(dateRangeFilter.end)

      missionsArray = missionsArray.filter(mission => {
        const missionDate = new Date(mission.missionDate)

        if(missionDate >= startDate && missionDate <= endDate) {
          return mission
        }
      })
    }

    if(personnelFilter) { // Personnel filter
      missionsArray = missionsArray.filter(mission => 
        mission?.Personnel?.some(person => person.email === personnelFilter)
      )
    }

    if(searchValue) { // Search value
      missionsArray = missionsArray.filter(mission => {
        const regex = new RegExp(searchValue, 'i')

        return regex.test(mission.missionDescription)
      })
    }

    const startIndex = (currentPage - 1) * 25
    const endIndex = currentPage * 25
    const filteredCount = missionsArray.length
    const tableData = missionsArray.slice(startIndex, endIndex)

    return { tableData, filteredCount } 
  }, [missionsArray, dateRangeFilter, personnelFilter, searchValue, currentPage])

  return data
}