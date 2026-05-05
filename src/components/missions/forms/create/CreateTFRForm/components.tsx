import { useHandleTFRInputs, useHandleAddTFRBtn, useHandleTFR } from './hooks'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const Header = () => (
  <h3 className="text-3xl text-neutral-content text-center font-[play]">Temporary Flight Restriction</h3>
)

export const TFRInputs = () => {
  const { visible, removeBtnProps } = useHandleTFRInputs()

  if(!visible) return null

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

  if(!visible) return null

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

  if(!visible) return null

  return (
    <div className="flex flex-col">
      <FormLabel name={'TemporaryFlightRestriction.temporaryFlightRestriction'}>
        Temporary Flight Restriction:
      </FormLabel>
      <textarea
        rows={4}
        className="textarea w-full"
        { ...methods.register('TemporaryFlightRestriction.temporaryFlightRestriction', {
          onChange: () => methods.setValue('TemporaryFlightRestriction._dirtied', true)
        }) }>
      </textarea>
    </div>
  )
}

export const TFRSourceInput = () => {
  const { methods, visible } = useHandleTFR()

  if(!visible) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <FormLabel 
          name={'TemporaryFlightRestriction.source'} 
          error={methods.formState.errors.TemporaryFlightRestriction?.source?.message}>
            Source:
        </FormLabel>
        <input
          type="text"
          className="input w-full"
          { ...methods.register('TemporaryFlightRestriction.source', {
            maxLength: {
              value: 50,
              message: 'TFR source must be 50 characters or less'
            },
            onChange: () => methods.setValue('TemporaryFlightRestriction._dirtied', true)
          }) } />
      </div>
    </div>
  )
}