import { useOnTableRowClick } from '../PersonnelTable/hooks'
import { useSetColumnVisibility } from '@/components/missions/tables/MissionsTable/hooks'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleTableRow = ({ tableData, index }: { tableData: AppTypes.VehicleRosterInterface, index: number }) => {
  const visible = useSetColumnVisibility()
  const onTableRowClick = useOnTableRowClick('vehicle', tableData.uuid)
  const missions = tableData.Vehicles?.length ? tableData.Vehicles.map(item => (item.Mission)) : []

  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null
  const className = `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const trProps = {
    className,
    onClick: onTableRowClick
  }

  return { visible, trProps, missions }
}