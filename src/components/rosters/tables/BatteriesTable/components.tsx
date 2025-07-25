import { useOnTableRowClick } from '../PersonnelTable/hooks'
import { useOnBatteryFilterChange, useHandleTableBody } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as CreateVehicleForm from '@/components/missions/forms/create/CreateVehicleForm/components'
import { useContext } from 'react'
import RostersCtx from '../../context'

export const Table = ({ tableData }: { tableData: AppTypes.BatteryRosterInterface[] }) => {

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <TableFilter />
      <table className="table text-neutral-content font-[play] w-full">
        <TableHeaders />
        <TableBody tableData={tableData} />
      </table>
    </div>
  )
}

const TableHeaders = () => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  if(!batteryRosterFilter) return

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="pl-10">Name</th>
        <th>Missions</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.BatteryRosterInterface[] }) => { // Projects table body
  const filtered = useHandleTableBody(tableData)

  return (
    <tbody>
      {filtered.map((battery, index) => {
        return (
          <TableRow
            key={`table-row-${ battery.uuid }`}
            tableData={battery}
            index={index} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ tableData, index }: { tableData: AppTypes.BatteryRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('battery', tableData.uuid)

  const missions = tableData.VehicleRoster?.Vehicles?.length ? tableData.VehicleRoster?.Vehicles.map(item => (item.Mission)) : []

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ index % 2 === 0 ? 'bg-neutral/20' : null }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{tableData.batteryName}</td>
      <td className="px-10 whitespace-nowrap">{missions.length}</td>
    </tr>
  )
}

const TableFilter = () => {
  const onChange = useOnBatteryFilterChange()

  return (
    <select
      className="select"
      onChange={onChange}>
        <CreateVehicleForm.RegistrationOptions />
    </select>
  )
}