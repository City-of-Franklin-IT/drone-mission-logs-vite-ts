import { memo } from 'react'
import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PaginationContainer from '../../containers/PaginationContainer'
import * as Components from './components'

const MissionsTable = memo(({ missions }: { missions: AppTypes.MissionInterface[] }) => {
  const tableData = useSetTableData(missions)

  if(!tableData.length) return (
    <Components.NoMissions />
  )

  return (
    <>
      <PaginationContainer />
      <Components.Table tableData={tableData} />    
    </>
  )
})

export default MissionsTable