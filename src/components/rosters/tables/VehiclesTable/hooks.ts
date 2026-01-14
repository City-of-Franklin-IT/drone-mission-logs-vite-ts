import { useOnTableRowClick } from '../PersonnelTable/hooks'
import { useSetColumnVisibility } from '@/components/missions/tables/MissionsTable/hooks'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns table row props and column visibility boolean; missions count
**/
export const useHandleTableRow = ({ tableData, index }: { tableData: AppTypes.VehicleRosterInterface, index: number }) => {
  const visible = useSetColumnVisibility()
  const onTableRowClick = useOnTableRowClick('vehicle', tableData.uuid)
  const missionsCount = Array.isArray(tableData.Vehicles) ?
    tableData.Vehicles.map(item => (item.Mission)).length :
    '-'

  const bgColor = index % 2 === 0 ?
    'bg-neutral/20' :
    null
  const className = `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const trProps = {
    className,
    onClick: onTableRowClick
  }

  return { visible, trProps, missionsCount }
}