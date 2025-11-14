import React, { useContext } from "react"
import RostersCtx from "../../context"
import { useOnTableRowClick } from "../PersonnelTable/hooks"

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

export const useHandleTableRow = ({ tableData, index }: { tableData: AppTypes.BatteryRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('battery', tableData.uuid)
  const missions = tableData.VehicleRoster?.Vehicles?.length ? tableData.VehicleRoster?.Vehicles.map(item => (item.Mission)) : []

  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null
  const className =  `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const trProps = {
    className,
    onClick: onTableRowClick
  }

  return { trProps, missions }
}