import { FormProvider } from "react-hook-form"
import { useHandleCreateRosterPersonnelForm } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateRosterPersonnelForm() {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleCreateRosterPersonnelForm()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 rounded-lg w-full">
        <Components.Header>Create Personnel</Components.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <Components.EmailInput />
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-lg'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default CreateRosterPersonnelForm