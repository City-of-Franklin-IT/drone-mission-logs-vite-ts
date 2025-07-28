// Components
import * as Components from './components'

function CreatePersonnelForm() {

  return (
    <div className="flex flex-col gap-4 items-center mt-10 p-6 mx-auto w-full border-2 border-info/10 rounded-xl xl:p-10">
      <Components.Header />
      <div className="flex flex-col gap-4 w-full md:flex-row md:gap-10 md:justify-around">
        <Components.PilotSelect />
        <Components.SupportPersonnelInput />
      </div>
    </div>
  )
}

export default CreatePersonnelForm