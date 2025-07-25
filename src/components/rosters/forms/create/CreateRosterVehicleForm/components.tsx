import { useFormContext } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const ModelInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.VehicleRosterCreateInterface>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel name={'model'}>
          Make / Model:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('model', {
            required: 'Make / model is required',
            maxLength: {
              value: 50,
              message: 'Make / model must be 50 characters or less'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.model?.message} />
    </div>
  )
}

export const RegistrationInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.VehicleRosterCreateInterface>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel name={'registration'}>
          Registration:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('registration', {
            maxLength: {
              value: 50,
              message: 'Registation must be 50 characters or less'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.registration?.message} />
    </div>
  )
}