// Components
import * as Components from './components'

function CreateFlightForm({ index }: { index: number }) {
  
  return (
    <Components.FlightInputs index={index} />
  )
}

export default CreateFlightForm