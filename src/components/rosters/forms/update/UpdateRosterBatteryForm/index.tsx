import { FormProvider } from 'react-hook-form'
import { useHandleUpdateRosterBatteryForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as CreateRosterBatteryForm from '../../create/CreateRosterBatteryForm/components'

function UpdateRosterBatteryForm({ battery }: { battery: AppTypes.BatteryRosterInterface | undefined }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateRosterBatteryForm(battery)
  
  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 w-full rounded-lg">
        <CreateRosterPersonnelForm.Header>Update Battery</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <CreateRosterBatteryForm.BatteryNameInput />
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-md'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default UpdateRosterBatteryForm