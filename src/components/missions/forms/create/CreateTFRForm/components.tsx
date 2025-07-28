import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content text-center font-[play]">Temporary Flight Restriction</h3>
  )
}

export const TFRInputs = () => {
  const { setValue, getValues } = useCreateMissionCtx()

  const values = getValues('TemporaryFlightRestriction')

  if(values?._deleted) return

  return (
    <div className="flex flex-col gap-4 w-full">
      <TFRInput />
      <TFRSourceInput />
      <RemoveBtn 
        onClick={() => setValue('TemporaryFlightRestriction._deleted', true, { shouldDirty: true, shouldValidate: true })}
        visible={!!values} />
    </div>
  )
}

export const AddTFRBtn = () => {
  const { setValue, getValues } = useCreateMissionCtx()

  const onClick = () => {
    setValue('TemporaryFlightRestriction.temporaryFlightRestriction', ''),
    setValue('TemporaryFlightRestriction.source', '')
  }

  const visible = !!getValues('TemporaryFlightRestriction') ? false : true

  if(!visible) return

  return (
    <button 
      type="button"
      className="btn btn-primary uppercase mx-auto w-fit shadow-xl"
      onClick={onClick}>
        Add Temporary Flight Restriction
    </button>
  )
}

export const TFRInput = () => {
  const { register, watch, setValue } = useCreateMissionCtx()

  const visible = !!watch('TemporaryFlightRestriction')

  if(!visible) return

  return (
    <div className="flex flex-col bg-neutral xl:flex-row">
      <FormLabel name={'TemporaryFlightRestriction.temporaryFlightRestriction'}>
        Temporary Flight Restriction:
      </FormLabel>
      <textarea
        rows={4}
        className={styles.input}
        { ...register('TemporaryFlightRestriction.temporaryFlightRestriction', {
          onChange: () => setValue('TemporaryFlightRestriction._dirtied', true)
        }) }>
      </textarea>
    </div>
  )
}

export const TFRSourceInput = () => {
  const { register, watch, formState: { errors }, setValue } = useCreateMissionCtx()

  const visible = !!watch('TemporaryFlightRestriction')

  if(!visible) return

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col bg-neutral xl:flex-row">
        <FormLabel name={'TemporaryFlightRestriction.source'}>
          Source:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          {  ...register('TemporaryFlightRestriction.source', {
            maxLength: {
              value: 50,
              message: 'TFR source must be 50 characters or less'
            },
            onChange: () => setValue('TemporaryFlightRestriction._dirtied', true)
          }) } />
      </div>
      <FormError error={errors.TemporaryFlightRestriction?.source?.message} />
    </div>
  )
}