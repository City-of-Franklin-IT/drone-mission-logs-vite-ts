import { FormProvider } from 'react-hook-form'
import { useHandleUpdateRosterVehicleForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as CreateRosterVehicleForm from '../../create/CreateRosterVehicleForm/components'

function UpdateRosterVehicleForm({ vehicle }: { vehicle: AppTypes.VehicleRosterInterface | undefined }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateRosterVehicleForm(vehicle)

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 w-full rounded-lg">
        <CreateRosterPersonnelForm.Header>Update Vehicle</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              <CreateRosterVehicleForm.ModelInput />
              <CreateRosterVehicleForm.RegistrationInput />
            </div>
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-lg'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default UpdateRosterVehicleForm