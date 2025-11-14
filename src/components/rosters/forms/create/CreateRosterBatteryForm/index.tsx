import { FormProvider } from "react-hook-form"
import { useHandleCreateRosterBatteryForm } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateRosterPersonnelForm from '../CreateRosterPersonnelForm/components'
import * as Components from './components'

function CreateRosterBatteryForm() {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleCreateRosterBatteryForm()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 rounded-lg w-full">
        <CreateRosterPersonnelForm.Header>Create Battery</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <Components.BatteryNameInput />
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-lg'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default CreateRosterBatteryForm