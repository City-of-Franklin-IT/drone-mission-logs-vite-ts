// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function BatteriesTable({ batteries }: { batteries: AppTypes.BatteryRosterInterface[] }) {

  return (
    <Components.Table tableData={batteries} />
  )
}

export default BatteriesTable