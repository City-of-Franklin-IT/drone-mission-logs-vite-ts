import { FormProvider } from 'react-hook-form'
import { useHandleUpdateRosterPersonnelForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import FormBtns from '@/components/form-elements/buttons/FormBtns'

function UpdateRosterPersonnelForm({ personnel }: { personnel: AppTypes.PersonnelRosterInterface | undefined }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateRosterPersonnelForm(personnel)

  return (
    <FormProvider { ...methods }>
      <div className="flex flex-col gap-2 p-6 bg-info/10 w-full rounded-lg">
        <CreateRosterPersonnelForm.Header>Update Personnel</CreateRosterPersonnelForm.Header>
        
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <CreateRosterPersonnelForm.EmailInput />
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-lg'} />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default UpdateRosterPersonnelForm