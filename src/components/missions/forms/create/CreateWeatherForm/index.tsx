// Components
import * as Components from './components'

function CreateWeatherForm() {
  
  return (
    <div className="flex flex-col gap-4 items-center p-10 mt-10 mx-auto w-full border-2 border-info/10 rounded-xl">
      <Components.Header />
      <div className="flex gap-10 justify-center flex-wrap">
        <Components.TemperatureInput />
        <Components.WindInput />
        <Components.VisibilitySelect />
        <Components.SourceInput />
      </div>
    </div>
  )
}

export default CreateWeatherForm