import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function MissionsTable({ missions }: { missions: AppTypes.MissionInterface[] }) {
  const tableData = useSetTableData(missions)

  return (
    <Components.Table tableData={tableData} />
  )
}

export default MissionsTable