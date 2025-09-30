import { useContext } from 'react'
import RostersCtx from '../../context'
import { useOnTableRowClick } from '../PersonnelTable/hooks'
import { useOnBatteryFilterChange, useHandleTableBody } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as CreateVehicleForm from '@/components/missions/forms/create/CreateVehicleForm/components'

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

type TableRowType = { tableData: AppTypes.BatteryRosterInterface, index: number }

const TableRow = (props: TableRowType) => {
  const onTableRowClick = useOnTableRowClick('battery', props.tableData.uuid)

  const missions = props.tableData.VehicleRoster?.Vehicles?.length ? props.tableData.VehicleRoster?.Vehicles.map(item => (item.Mission)) : []

  const bgColor = props.index % 2 === 0 ? 'bg-neutral/20' : null

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{props.tableData.batteryName}</td>
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