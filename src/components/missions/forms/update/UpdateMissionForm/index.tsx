import { FormProvider } from 'react-hook-form'
import { useHandleUpdateMissionForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import CreatePersonnelForm from '../../create/CreatePersonnelForm'
import * as MissionCreate from '../../create/CreateMissionForm/components'
import * as PersonnelContainer from '@/components/rosters/containers/PersonnelContainer/components'
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import CreateTFRForm from '../../create/CreateTFRForm'
import CreateWeatherForm from '../../create/CreateWeatherForm'

function UpdateMissionForm({ mission }: { mission: AppTypes.MissionInterface | undefined }) {
  const { methods, onCancelBtnClick, deleteBtnProps, handleFormSubmit } = useHandleUpdateMissionForm(mission)

  return (
    <FormProvider { ...methods }>
      <MissionCreate.Header>Update Mission</MissionCreate.Header>
      
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <MissionCreate.MissionDetailInputs />
        <div className="flex flex-col mx-auto w-4/5">
          <CreatePersonnelForm />
          <MissionCreate.ResponseOnlyInput />
          <MissionCreate.VehicleInputs />
          <CreateWeatherForm />
          <CreateTFRForm />
          <MissionCreate.PreflightInspectionInput />
          <MissionCreate.FlightInputs />
          <MissionCreate.PostflightInspectionInput />
          <div className="flex flex-col gap-6">
            <FormBtns 
              onCancelBtnClick={onCancelBtnClick}
              size={'btn-lg'} />
            <PersonnelContainer.DeleteBtn 
              onClick={deleteBtnProps.onClick}
              size={'btn-lg'}>
                {deleteBtnProps.label}
            </PersonnelContainer.DeleteBtn>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default UpdateMissionForm