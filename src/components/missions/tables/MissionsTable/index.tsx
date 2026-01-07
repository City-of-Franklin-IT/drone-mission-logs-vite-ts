import { memo } from 'react'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

const MissionsTable = memo(({ tableData }: { tableData: AppTypes.MissionInterface[] }) => {
  if(!tableData.length) return (
    <Components.NoMissions />
  )

  return (
    <Components.Table tableData={tableData} />
  )
})

export default MissionsTable