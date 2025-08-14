import { memo } from 'react'
import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

const MissionsTable = memo(({ missions }: { missions: AppTypes.MissionInterface[] }) => {
  const tableData = useSetTableData(missions)

  return (
    <Components.Table tableData={tableData} />
  )
})

export default MissionsTable