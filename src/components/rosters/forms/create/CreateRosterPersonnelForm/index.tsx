import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "../../update/UpdateRosterPersonnelForm/hooks"
import { useCreateRosterPersonnel, useHandleFormSubmit } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateRosterPersonnelForm() {
  const methods = useCreateRosterPersonnel()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 rounded-lg w-full">
        <Components.Header>Create Personnel</Components.Header>
        
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
          <Components.EmailInput />
          <FormBtns 
            onCancelBtnClick={onCancelBtnClick}
            size={'btn-sm'} />
        </form>
      </div>
    </FormProvider>
  )
}

export default CreateRosterPersonnelForm