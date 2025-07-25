import { FormProvider } from 'react-hook-form'
import { useOnCancelBtnClick } from '../UpdateRosterPersonnelForm/hooks'
import { useUpdateRosterVehicle, useHandleFormSubmit } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as CreateRosterVehicleForm from '../../create/CreateRosterVehicleForm/components'

function UpdateRosterVehicleForm({ vehicle }: { vehicle: AppTypes.VehicleRosterInterface | undefined }) {
  const methods = useUpdateRosterVehicle(vehicle)

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 w-full rounded-lg">
        <CreateRosterPersonnelForm.Header>Update Vehicle</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
          <div className="flex flex-col gap-4 w-full">
            <CreateRosterVehicleForm.ModelInput />
            <CreateRosterVehicleForm.RegistrationInput />
          </div>
          <FormBtns 
            onCancelBtnClick={onCancelBtnClick}
            size={'btn-sm'} />
        </form>
      </div>
    </FormProvider>
  )
}

export default UpdateRosterVehicleForm