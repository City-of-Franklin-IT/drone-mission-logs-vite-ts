import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { useCreateRosterBattery, useHandleFormSubmit } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateRosterPersonnelForm from '../CreateRosterPersonnelForm/components'
import * as Components from './components'

function CreateRosterBatteryForm() {
  const methods = useCreateRosterBattery()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 rounded-lg w-full">
        <CreateRosterPersonnelForm.Header>Create Battery</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
          <Components.BatteryNameInput />
          <FormBtns 
            onCancelBtnClick={onCancelBtnClick}
            size={'btn-sm'} />
        </form>
      </div>
    </FormProvider>
  )
}

export default CreateRosterBatteryForm