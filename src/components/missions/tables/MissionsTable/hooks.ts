import { useContext, useMemo, useState, useLayoutEffect } from "react"
import MissionsCtx from "../../context"
import { iconMap } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns paginated mission table data; applies filters when applicable
**/
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

/**
* Returns visibility boolean for table columns; hides certain columns on smaller devices
**/
export const useSetColumnVisibility = () => {
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

/**
* Returns onClick handler for mission details button, expanded boolean, mission description visibility boolean, and expanded button icon source
**/
export const useHandleTableRow = () => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  const onDetailsBtnClick = () => {
    setState(prevState => ({ expanded: !prevState.expanded }))
  }

  const visible = useSetColumnVisibility()

  const btnIconSrc = !state.expanded ? iconMap.get('downArrow')! : iconMap.get('upArrow')!

  return { expanded: state.expanded, onDetailsBtnClick, visible, btnIconSrc }
}