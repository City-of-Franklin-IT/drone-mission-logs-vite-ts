import { useHandleResponseOnly } from '../CreateMissionForm/hooks'

// Components
import * as Components from './components'

function CreateTFRForm() {
  const visible = useHandleResponseOnly()

  if(!visible) return null

  return (
    <div className="flex flex-col gap-4 items-center mt-10 p-6 mx-auto w-full border-2 border-info/10 rounded-xl xl:p-10">
      <Components.Header />
      <div className="flex flex-col gap-4 w-full">
        <Components.AddTFRBtn />
        <Components.TFRInputs />
      </div>
    </div>
  )
}

export default CreateTFRForm