import { useOnTableRowClick } from '../PersonnelTable/hooks'

// Types
import * as AppTypes from '@/context/App/types'

export const Table = ({ tableData }: { tableData: AppTypes.VehicleRosterInterface[] }) => {

  return (
    <table className="table text-neutral-content font-[play] w-fit">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="px-10">Make/Model</th>
        <th className="px-10">Registration</th>
        <th className="px-10">Missions</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.VehicleRosterInterface[] }) => {

  return (
    <tbody>
      {tableData.map((vehicle, index) => {
        return (
          <TableRow
            key={`table-row-${ vehicle.uuid }`}
            tableData={vehicle}
            index={index} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ tableData, index }: { tableData: AppTypes.VehicleRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('vehicle', tableData.uuid)

  const missions = tableData.Vehicles?.length ? tableData.Vehicles.map(item => (item.Mission)) : []

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ index % 2 === 0 ? 'bg-neutral/20' : null }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{tableData.model}</td>
      <td className="px-10">{tableData.registration}</td>
      <td className="px-10 text-center">{missions.length}</td>
    </tr>
  )
}