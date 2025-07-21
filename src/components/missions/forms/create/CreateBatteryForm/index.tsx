// Components
import * as Components from './components'

function CreateBatteryForm({ index }: { index: number }) {

  return (
    <Components.BatteryInput index={index} />
  )
}

export default CreateBatteryForm