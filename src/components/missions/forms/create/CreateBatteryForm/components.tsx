import { Controller } from "react-hook-form"
import { useHandleBatteryInput, useHandleBatteryOptions } from './hooks'

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
  const { control, setValue, visible, removeBtnProps } = useHandleBatteryInput(index)

  if(!visible) return

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={`Vehicle.Batteries.${ index }.batteryName`}
        render={({ field }) => (
          <div className="flex flex-col">
            <FormLabel name={field.name}>
              Battery {index + 1}:
            </FormLabel>
            <select
              className="select hover:cursor-pointer"
              { ...field }
              onChange={(e) => {
                field.onChange(e)
                setValue(`Vehicle.Batteries.${ index }._dirtied`, true)
              }}>
                <BatteryOptions />
            </select>
          </div>
        )} />
        <RemoveBtn { ...removeBtnProps } />
    </div>
  )
}

const BatteryOptions = () => {
  const batteries = useHandleBatteryOptions()

  return (
    <>
      <option value=""></option>
      {batteries.map(battery => (
        <BatteryOption
          key={`battery-option-${battery.uuid}`}
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