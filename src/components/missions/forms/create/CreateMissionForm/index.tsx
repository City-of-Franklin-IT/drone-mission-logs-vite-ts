import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick, useCreateMissionForm, useHandleFormSubmit } from "./hooks"

// Components
import CreatePersonnelForm from "../CreatePersonnelForm"
import CreateWeatherForm from "../CreateWeatherForm"
import CreateTFRForm from "../CreateTFRForm"
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateMissionForm() {
  const methods = useCreateMissionForm()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <Components.Header>Create Mission</Components.Header>
      
      <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
        <div className="flex flex-col gap-4 p-10 mx-auto w-4/5 border-2 border-info/10 rounded-xl">
          <div className="flex gap-4 flex-wrap">
            <Components.MissionDateInput />
            <Components.IncidentNumberInput />
            <Components.LocationInput />
          </div>
          <Components.MissionDescriptionInput />
        </div>
        <div className="flex flex-col mx-auto w-4/5">
          <CreatePersonnelForm />
          <Components.VehicleInputs />
          <CreateWeatherForm />
          <CreateTFRForm />
          <Components.PreflightInspectionInput />
          <Components.FlightInputs />
          <Components.PostflightInspectionInput />
          <FormBtns 
            onCancelBtnClick={onCancelBtnClick}
            size={'btn-lg'} />
        </div>
      </form>
    </FormProvider>
  )
}

export default CreateMissionForm