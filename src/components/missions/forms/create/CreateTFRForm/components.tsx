import styles from '@/components/form-elements/Forms.module.css'
import { useHandleTFRInputs, useHandleAddTFRBtn, useHandleTFR } from './hooks'

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
  const { visible, removeBtnProps } = useHandleTFRInputs()

  if(!visible) return

  return (
    <div className="flex flex-col gap-4 w-full">
      <TFRInput />
      <TFRSourceInput />
      <RemoveBtn { ...removeBtnProps } />
    </div>
  )
}

export const AddTFRBtn = () => {
  const { visible, onClick } = useHandleAddTFRBtn()

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
  const { methods, visible } = useHandleTFR()

  if(!visible) return

  return (
    <div className="flex flex-col bg-neutral xl:flex-row">
      <FormLabel name={'TemporaryFlightRestriction.temporaryFlightRestriction'}>
        Temporary Flight Restriction:
      </FormLabel>
      <textarea
        rows={4}
        className={styles.input}
        { ...methods.register('TemporaryFlightRestriction.temporaryFlightRestriction', {
          onChange: () => methods.setValue('TemporaryFlightRestriction._dirtied', true)
        }) }>
      </textarea>
    </div>
  )
}

export const TFRSourceInput = () => {
  const { methods, visible } = useHandleTFR()

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
          {  ...methods.register('TemporaryFlightRestriction.source', {
            maxLength: {
              value: 50,
              message: 'TFR source must be 50 characters or less'
            },
            onChange: () => methods.setValue('TemporaryFlightRestriction._dirtied', true)
          }) } />
      </div>
      <FormError error={methods.formState.errors.TemporaryFlightRestriction?.source?.message} />
    </div>
  )
}