import { useContext, useMemo } from "react"
import MissionsCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useSetTableData = (missions: AppTypes.MissionInterface[]) => {
  const { dateRangeFilter, personnelFilter } = useContext(MissionsCtx)

  let missionsArray = missions

  return useMemo(() => {
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

    return missionsArray
  }, [missionsArray, dateRangeFilter, personnelFilter])
}