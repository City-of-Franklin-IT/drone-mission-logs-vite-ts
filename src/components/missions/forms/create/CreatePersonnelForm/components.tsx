import { Controller } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content font-[play]">Personnel</h3>
  )
}

export const PilotInput = () => {
  const { control, setValue } = useCreateMissionCtx()

  return (
    <Controller
      control={control}
      name={`Personnel.${ 0 }.email`}
      rules={{
        required: 'Pilot email is required',
        maxLength: {
          value: 255,
          message: 'Pilot email must be 255 characters or less'
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-6">
          <div className="flex">
            <FormLabel
              name={field.name}
              required={true}>
                Pilot Email:
            </FormLabel>
            <input 
              type="email"
              className={styles.input}
              { ...field }
              onChange={(e) => {
                field.onChange(e)
                setValue(`Personnel.${ 0 }._dirtied`, true)
              }} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

export const SupportPersonnelInput = () => {
  const { control, setValue, getValues } = useCreateMissionCtx()

  const values = getValues(`Personnel.${ 1 }`)

  if(values?._deleted) return

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={`Personnel.${ 1 }.email`}
        rules={{
          maxLength: {
            value: 255,
            message: 'Personnel email must be 255 characters or less'
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-6 w-full">
            <div className="flex">
              <FormLabel name={field.name}>
                Support Email:
              </FormLabel>
              <input 
                type="email"
                className={styles.input}
                { ...field }
                onChange={(e) => {
                  field.onChange(e)
                  setValue(`Personnel.${ 1 }._dirtied`, true)
                }} />
            </div>
            <FormError error={error?.message} />
          </div>
        )} />
        <RemoveBtn 
          onClick={() => setValue(`Personnel.${ 1 }._deleted`, true, { shouldDirty: true, shouldValidate: true })}
          visible={!!values?.email} />
    </div>
  )
}