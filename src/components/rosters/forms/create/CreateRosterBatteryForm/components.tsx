import { useFormContext } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const BatteryNameInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.BatteryRosterCreateInterface>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel 
          name={'batteryName'}
          required={true}>
            Battery Name:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('batteryName', {
            required: 'Battery name is required',
            maxLength: {
              value: 50,
              message: 'Battery name must be 50 characters or less'
            },
            onChange: () => setValue('_dirtied', true, { shouldDirty: true, shouldValidate: true })
          }) } />
      </div>
      <FormError error={errors.batteryName?.message} />
    </div>
  )
}