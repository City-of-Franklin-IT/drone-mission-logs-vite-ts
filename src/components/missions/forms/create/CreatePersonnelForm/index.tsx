// Components
import * as Components from './components'

function CreatePersonnelForm() {

  return (
    <div className="flex flex-col gap-4 items-center p-10 mt-10 mx-auto w-full border-2 border-info/10 rounded-xl">
      <Components.Header />
      <div className="flex gap-10">
        <Components.PilotInput />
        <Components.SupportPersonnelInput />
      </div>
    </div>
  )
}

export default CreatePersonnelForm