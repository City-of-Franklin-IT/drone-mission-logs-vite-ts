import { FormProvider } from 'react-hook-form'
import { useHandleCreateRosterVehicleForm } from './hooks'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../CreateRosterPersonnelForm/components'
import * as Components from './components'

function CreateRosterVehicleForm() {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleCreateRosterVehicleForm()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 rounded-lg w-full">
        <CreateRosterPersonnelForm.Header>Create Vehicle</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4 w-full">
            <Components.ModelInput />
            <Components.RegistrationInput />
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-md'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default CreateRosterVehicleForm