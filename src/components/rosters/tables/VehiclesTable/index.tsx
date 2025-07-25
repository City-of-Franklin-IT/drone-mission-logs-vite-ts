// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function VehiclesTable({ vehicles }: { vehicles: AppTypes.VehicleRosterInterface[] }) {

  return (
    <Components.Table tableData={vehicles} />
  )
}

export default VehiclesTable
