import { useOnTableRowClick } from '../PersonnelTable/hooks'
import { useSetColumnVisibility } from '@/components/missions/tables/MissionsTable/hooks'

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
  const visible = useSetColumnVisibility()

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="px-10">Make/Model</th>
        <th className={`px-10 ${ !visible ? 'hidden' : 'block' }`}>Registration</th>
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

type TableRowProps = { tableData: AppTypes.VehicleRosterInterface, index: number }

const TableRow = (props: TableRowProps) => {
  const visible = useSetColumnVisibility()

  const onTableRowClick = useOnTableRowClick('vehicle', props.tableData.uuid)

  const missions = props.tableData.Vehicles?.length ? props.tableData.Vehicles.map(item => (item.Mission)) : []

  const bgColor = props.index % 2 === 0 ? 'bg-neutral/20' : null

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{props.tableData.model}</td>
      <td className={`px-10 ${ !visible ? 'hidden' : 'block' }`}>{props.tableData.registration}</td>
      <td className="px-10 text-center">{missions.length}</td>
    </tr>
  )
}