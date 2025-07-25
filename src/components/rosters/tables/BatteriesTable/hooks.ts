import React, { useContext } from "react"
import RostersCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useOnBatteryFilterChange = () => {
  const { dispatch } = useContext(RostersCtx)

  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value

    dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload: value })
  }
}

export const useHandleTableBody = (tableData: AppTypes.BatteryRosterInterface[]) => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  if(!batteryRosterFilter) return []

  return tableData.filter(battery => battery.registration === batteryRosterFilter)
}