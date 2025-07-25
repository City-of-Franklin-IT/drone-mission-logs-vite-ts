import { useFormContext } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h3 className="text-xl font-[play] text-neutral-content text-center">{children}</h3>
  )
}

export const EmailInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.PersonnelRosterCreateInterface>()

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex">
        <FormLabel name={'email'}>
          Email:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('email', {
            required: 'Email is required',
            validate: (value) => {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              return emailRegex.test(value) || 'Please enter a valid email address'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.email?.message} />
    </div>
  )
}