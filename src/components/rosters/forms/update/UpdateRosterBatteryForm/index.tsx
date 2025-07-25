import { FormProvider } from 'react-hook-form'
import { useOnCancelBtnClick } from '../UpdateRosterPersonnelForm/hooks'
import { useUpdateRosterBattery, useHandleFormSubmit } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as CreateRosterBatteryForm from '../../create/CreateRosterBatteryForm/components'

function UpdateRosterBatteryForm({ battery }: { battery: AppTypes.BatteryRosterInterface | undefined }) {
  const methods = useUpdateRosterBattery(battery)

  const onCancelBtnClick = useOnCancelBtnClick()
  
  const handleFormSubmit = useHandleFormSubmit()
  
  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 w-full rounded-lg">
        <CreateRosterPersonnelForm.Header>Update Battery</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
          <CreateRosterBatteryForm.BatteryNameInput />
          <FormBtns 
            onCancelBtnClick={onCancelBtnClick}
            size={'btn-sm'} />
        </form>
      </div>
    </FormProvider>
  )
}

export default UpdateRosterBatteryForm