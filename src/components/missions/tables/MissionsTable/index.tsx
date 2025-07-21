// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function MissionsTable({ missions }: { missions: AppTypes.MissionInterface[] }) {

  return (
    <Components.Table tableData={missions} />
  )
}

export default MissionsTable