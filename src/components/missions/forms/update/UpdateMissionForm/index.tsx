import { FormProvider } from 'react-hook-form'
import { useUpdateMissionForm, useOnCancelBtnClick, useHandleFormSubmit } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import CreatePersonnelForm from '../../create/CreatePersonnelForm'
import * as MissionCreate from '../../create/CreateMissionForm/components'
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import CreateTFRForm from '../../create/CreateTFRForm'
import CreateWeatherForm from '../../create/CreateWeatherForm'

function UpdateMissionForm({ mission }: { mission: AppTypes.MissionInterface | undefined }) {
  const methods = useUpdateMissionForm(mission)

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <MissionCreate.Header>Update Mission</MissionCreate.Header>
      
      <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
        <div className="flex flex-col gap-4 p-10 mx-auto w-4/5 border-2 border-info/10 rounded-xl">
          <div className="flex gap-4 flex-wrap">
            <MissionCreate.MissionDateInput />
            <MissionCreate.IncidentNumberInput />
            <MissionCreate.LocationInput />
          </div>
          <MissionCreate.MissionDescriptionInput />
        </div>
        <div className="flex flex-col mx-auto w-4/5">
          <CreatePersonnelForm />
          <MissionCreate.VehicleInputs />
          <CreateWeatherForm />
          <CreateTFRForm />
          <MissionCreate.PreflightInspectionInput />
          <MissionCreate.FlightInputs />
          <MissionCreate.PostflightInspectionInput />
        </div>
        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default UpdateMissionForm