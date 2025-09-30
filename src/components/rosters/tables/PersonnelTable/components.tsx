import { useOnTableRowClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

export const Table = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => {

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
        <th className="pl-10">Email</th>
        <th>Missions</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.PersonnelRosterInterface[] }) => { // Projects table body

  return (
    <tbody>
      {tableData.map((personnel, index) => {
        return (
          <TableRow
            key={`table-row-${ personnel.uuid }`}
            tableData={personnel}
            index={index} />
        )
      })}
    </tbody>
  )
}

type TableRowProps = { tableData: AppTypes.PersonnelRosterInterface, index: number }

const TableRow = (props: TableRowProps) => {
  const onTableRowClick = useOnTableRowClick('personnel', props.tableData.uuid)

  const missions = props.tableData.Personnel?.length ? props.tableData.Personnel.map(item => (item.Mission)) : []

  const bgColor = props.index % 2 === 0 ? 'bg-neutral/20' : null

  return (
    <tr className={`border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`} onClick={onTableRowClick}>
      <td className="px-10 whitespace-nowrap">{props.tableData.email}</td>
      <td className="px-10 whitespace-nowrap">{missions.length}</td>
    </tr>
  )
}