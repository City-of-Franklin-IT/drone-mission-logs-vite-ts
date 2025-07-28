import { Controller } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import styles from '@/components/form-elements/Forms.module.css'
import { useOnCurrentDateTimeBtnClick } from './hooks'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const FlightInputs = ({ index }: { index: number }) => {
  const { getValues, setValue } = useCreateMissionCtx()

  const values = getValues(`Flights.${ index }`)

  if(values?._deleted) return

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-10 md:flex-row md:justify-center md:flex-wrap">
        <TakeOffInput index={index} />
        <LandingInput index={index} />
      </div>
      <RemoveBtn
        onClick={() => setValue(`Flights.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })}
        visible={!!values.takeOffDateTime || !!values.landingDateTime} />
    </div>
  )
}

const TakeOffInput = ({ index }: { index: number }) => {
  const { control, watch, setValue } = useCreateMissionCtx()

  const onCurrentDateTimeBtnClick = useOnCurrentDateTimeBtnClick()

  const landingDateTime = watch(`Flights.${ index }.landingDateTime`)

  return (
    <Controller
      control={control}
      name={`Flights.${ index }.takeOffDateTime`}
      rules={{
        required: 'Takeoff time is required',
        validate: (value) => {
          if(!landingDateTime) return true
          
          const takeoffTime = new Date(value)
          const landingTime = new Date(landingDateTime)
          
          if(takeoffTime >= landingTime) {
            return "Takeoff time must be before landing time"
          }
          
          return true
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col bg-neutral xl:flex-row">
              <FormLabel name={field.name}>
                Takeoff Time:
              </FormLabel>
              <input 
                type="datetime-local"
                className={styles.input}
                { ...field }
                onChange={(e) => {
                  field.onChange(e)
                  setValue(`Flights.${ index }._dirtied`, true)
                }} />
            </div>
            <CurrentDateTimeBtn onClick={() => onCurrentDateTimeBtnClick(field.name)} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const LandingInput = ({ index }: { index: number }) => {
  const { control, watch, setValue } = useCreateMissionCtx()

  const onCurrentDateTimeBtnClick = useOnCurrentDateTimeBtnClick()

  const takeOffDateTime = watch(`Flights.${index}.takeOffDateTime`)

  return (
    <Controller
      control={control}
      name={`Flights.${ index }.landingDateTime`}
      rules={{
        required: "Landing time is required",
        validate: (value) => {
          if(!takeOffDateTime) return true
          
          const landingTime = new Date(value)
          const takeoffTime = new Date(takeOffDateTime)
          
          if(landingTime <= takeoffTime) {
            return "Landing time must be after takeoff time"
          }
          
          return true
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col bg-neutral xl:flex-row">
              <FormLabel name={field.name}>
                Landing Time:
              </FormLabel>
              <input 
                type="datetime-local"
                className={styles.input}
                { ...field }
                onChange={(e) => {
                  field.onChange(e)
                  setValue(`Flights.${ index }._dirtied`, true)
                }} />
            </div>
            <CurrentDateTimeBtn onClick={() => onCurrentDateTimeBtnClick(field.name)} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

type CurrentDateTimeBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement> }

const CurrentDateTimeBtn = (props: CurrentDateTimeBtnProps) => {

  return (
    <button 
      type="button"
      className="btn btn-sm btn-info uppercase"
      onClick={props.onClick}>
        Use Current Time
    </button>
  )
}