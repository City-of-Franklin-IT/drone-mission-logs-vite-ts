import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import styles from '@/components/form-elements/Forms.module.css'
import { useGetVehicleRegistrations } from './hooks'

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
  const { register, formState: { errors } } = useCreateMissionCtx()

  const { isLoading } = useGetVehicleRegistrations()

  if(isLoading) return

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={'Vehicle.registration'}
          required={true}>
            Vehicle Registration:
        </FormLabel>
        <select
          className={styles.input}
          { ...register('Vehicle.registration', {
            required: 'Vehicle registration is required'
          }) }>
            <RegistrationOptions />
        </select>
      </div>
      <FormError error={errors.Vehicle?.registration?.message} />
    </div>
  )
}

const RegistrationOptions = () => {
  const { data } = useGetVehicleRegistrations()

  const registrations = data?.data || []

  return (
    <>
      <option value=""></option>
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