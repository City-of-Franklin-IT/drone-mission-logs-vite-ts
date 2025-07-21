import { Controller } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import styles from '@/components/form-elements/Forms.module.css'
import { useGetBatteries } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content font-[play]">Batteries</h3>
  )
}

export const BatteryInput = ({ index }: { index: number }) => {
  const { control, setValue, getValues } = useCreateMissionCtx()

  const { isLoading } = useGetBatteries()

  const values = getValues(`Vehicle.Batteries.${ index }`)

  if(isLoading || values?._deleted) return

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={`Vehicle.Batteries.${ index }.batteryName`}
        render={({ field }) => (
          <div className="flex">
            <FormLabel
              name={field.name}>
                Battery {index + 1}:
            </FormLabel>
            <select
              className={styles.input}
              { ...field }
              onChange={(e) => {
                field.onChange(e)
                setValue(`Vehicle.Batteries.${ index }._dirtied`, true)
              }}>
                <BatteryOptions />
            </select>
          </div>
        )} />
        <RemoveBtn 
          onClick={() => setValue(`Vehicle.Batteries.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })}
          visible={!!values?.batteryName} />
    </div>
  )
}

const BatteryOptions = () => {
  const { data } = useGetBatteries()

  const batteries = data?.data || []

  return (
    <>
      <option value=""></option>
      {batteries.map(battery => (
        <BatteryOption
          key={`battery-option-${ battery.uuid }`}
          battery={battery} />
      ))}
    </>
  )
}

const BatteryOption = ({ battery }: { battery: AppTypes.BatteryRosterInterface }) => {
  if(!battery) return

  return (
    <option value={battery.batteryName}>{battery.batteryName}</option>
  )
}