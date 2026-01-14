import React, { useContext } from "react"
import RostersCtx from "../../context"
import { useOnTableRowClick } from "../PersonnelTable/hooks"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns filter select onChange handler; updates batteryRosterFilter in context
**/
export const useOnBatteryFilterChange = () => {
  const { batteryRosterFilter, dispatch } = useContext(RostersCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.currentTarget.value

    if(payload !== batteryRosterFilter) {
      dispatch({ type: 'SET_BATTERY_ROSTER_FILTER', payload })
    }
  }

  return onChange
}

/**
* Returns battery data filtered by selected vehicle / batteryRosterFilter in context
**/
export const useHandleTableBody = (tableData: AppTypes.BatteryRosterInterface[]) => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  if(!batteryRosterFilter) return []

  const filtered = tableData.filter(battery => battery.registration === batteryRosterFilter)

  return filtered
}

/**
* Returns table row props including className and onClick handler
**/
export const useHandleTableRow = ({ tableData, index }: { tableData: AppTypes.BatteryRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('battery', tableData.uuid)
  const missionsCount = Array.isArray(tableData.VehicleRoster?.Vehicles) ?
    tableData.VehicleRoster?.Vehicles.map(item => (item.Mission)).length :
    '-'

  const bgColor = index % 2 === 0 ?
    'bg-neutral/20' :
    null
  const className =  `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const trProps = {
    className,
    onClick: onTableRowClick
  }

  return { trProps, missionsCount }
}