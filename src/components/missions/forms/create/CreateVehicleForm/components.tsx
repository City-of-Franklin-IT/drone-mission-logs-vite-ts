import { useHandleVehicleRegistrationInput, useGetVehicleRegistrations } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content font-[play]">Vehicle</h3>
  )
}

export const VehicleRegistrationInput = () => {
  const { methods, isLoading } = useHandleVehicleRegistrationInput()

  if(isLoading) return

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex flex-col w-full">
        <FormLabel 
          name={'Vehicle.registration'} 
          required={true}>
            Vehicle Registration:
        </FormLabel>
        <select
          className="select w-full hover:cursor-pointer"
          { ...methods.register('Vehicle.registration', {
            required: 'Vehicle registration is required',
            onChange: () => methods.setValue('Vehicle._dirtied', true, { shouldDirty: true, shouldValidate: true })
          }) }>
            <RegistrationOptions />
        </select>
      </div>
      <FormError error={methods.formState.errors.Vehicle?.registration?.message} />
    </div>
  )
}

export const RegistrationOptions = () => {
  const { data, isLoading } = useGetVehicleRegistrations()

  const registrations = data?.data ?? []

  if(isLoading) return

  return (
    <>
      <option value="">Select vehicle..</option>
      {registrations.map(registration => (
        <RegistrationOption
          key={`registration-option-${registration.uuid}`}
          registration={registration} />
      ))}
    </>
  )
}

const RegistrationOption = ({ registration }: { registration: AppTypes.VehicleRosterInterface }) => {
  if(!registration) return

  return (
    <option value={registration.registration}>{registration.model} - {registration.registration}</option>
  )
}