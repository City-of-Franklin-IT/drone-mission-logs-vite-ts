import { FormProvider } from "react-hook-form"
import { useHandleCreateMissionForm } from "./hooks"

// Components
import CreatePersonnelForm from "../CreatePersonnelForm"
import CreateWeatherForm from "../CreateWeatherForm"
import CreateTFRForm from "../CreateTFRForm"
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateMissionForm() {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleCreateMissionForm()

  return (
    <FormProvider { ...methods }>
      <Components.Header>Create Mission</Components.Header>
      
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Components.MissionDetailInputs />
        <div className="flex flex-col mx-auto w-full xl:w-4/5">
          <CreatePersonnelForm />
          <Components.ResponseOnlyInput />
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