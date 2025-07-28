import { useContext, useMemo, useState, useLayoutEffect } from "react"
import MissionsCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useSetTableData = (missions: AppTypes.MissionInterface[]) => {
  const { dateRangeFilter, personnelFilter, searchValue, currentPage } = useContext(MissionsCtx)

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

    if(searchValue) { // Search value
      missionsArray = missionsArray.filter(mission => {
        const regex = new RegExp(searchValue, 'i')

        return regex.test(mission.missionDescription)
      })
    }

    const startIndex = (currentPage - 1) * 25
    const endIndex = currentPage * 25

    return missionsArray.slice(startIndex, endIndex)
  }, [missionsArray, dateRangeFilter, personnelFilter, searchValue, currentPage])
}

export const useDescriptionVisibility = () => {
  const [state, setState] = useState<{ visible: boolean }>({ visible: false })

  useLayoutEffect(() => {
    const updateVisibility = () => {
      setState({ visible: window.innerWidth >= 1024 })
    }

    updateVisibility()

    window.addEventListener('resize', updateVisibility)

    return () => window.removeEventListener('resize', updateVisibility)
  }, [])

  return state.visible
}