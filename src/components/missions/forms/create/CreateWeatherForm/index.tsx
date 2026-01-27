import { useHandleResponseOnly } from '../CreateMissionForm/hooks'

// Components
import * as Components from './components'

function CreateWeatherForm() {
  const visible = useHandleResponseOnly()

  if(!visible) return null
  
  return (
    <div className="flex flex-col gap-4 items-center mt-10 p-6 mx-auto w-full border-2 border-info/10 rounded-xl xl:p-10">
      <Components.Header />
      <div className="flex flex-col gap-4 w-full md:flex-row md:flex-wrap md:justify-center md:gap-10">
        <Components.TemperatureInput />
        <Components.WindInput />
        <Components.VisibilitySelect />
        <Components.SourceInput />
      </div>
    </div>
  )
}

export default CreateWeatherForm