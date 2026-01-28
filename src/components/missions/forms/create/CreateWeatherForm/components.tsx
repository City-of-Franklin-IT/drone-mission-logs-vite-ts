import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import { visibilityTypeMap } from './utils'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

// Types
import * as AppTypes from '@/context/App/types'

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content font-[play]">Weather</h3>
  )
}

export const TemperatureInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col">
        <FormLabel name={'Weather.temperature'}>
          Air Temperature:
        </FormLabel>
        <input
          type="number"
          className="input min-w-[100px] w-full"
          { ...register('Weather.temperature', {
            min: {
              value: 0,
              message: 'Temperature must be 0 or greater'
            },
            max: {
              value: 130,
              message: 'Temperature must be 130 or less'
            },
            onChange: () => setValue('Weather._dirtied', true)
          }) } />
      </div>
      <FormError error={errors.Weather?.temperature?.message} />
    </div>
  )
}

export const VisibilitySelect = () => {
  const { register, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col">
      <FormLabel name={'Weather.visibility'}>
        Visibility:
      </FormLabel>
      <select
        className="select w-full hover:cursor-pointer"
        { ...register('Weather.visibility', {
          onChange: () => setValue('Weather._dirtied', true)
        }) }>
          <VisibilityOptions />
      </select>
    </div>
  )
}

export const WindInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col">
        <FormLabel name={'Weather.wind'}>
          Wind Speed:
        </FormLabel>
        <input
          type="number"
          className="input w-full"
          { ...register('Weather.wind', {
            min: {
              value: 0,
              message: 'Minimum wind speed is 0'
            },
            max: {
              value: 100,
              message: 'Maximum wind speed is 100'
            },
            onChange: () => setValue('Weather._dirtied', true)
          }) } />
      </div>
      <FormError error={errors.Weather?.wind?.message} />
    </div>
  )
}

export const SourceInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col">
        <FormLabel name={'Weather.source'}>
          Source:
        </FormLabel>
        <input
          type="text"
          className="input w-full"
          { ...register('Weather.source', {
            maxLength: {
              value: 50,
              message: 'Source must be 50 characters or less'
            },
            onChange: () => setValue('Weather._dirtied', true)
          }) } />
      </div>
      <FormError error={errors.Weather?.source?.message} />
    </div>
  )
}

const VisibilityOptions = () => {
  const options = [ ...visibilityTypeMap.values() ] as { value: AppTypes.VisibilityType, label: string }[]

  return (
    <>
      <option value=""></option>
      {options.map(option => (
        <VisibilityOption
          key={`visibility-option-${ option.value }`}
          option={option} />
      ))}
    </>
  )
}

const VisibilityOption = ({ option }: { option: { value: AppTypes.VisibilityType, label: string } }) => {

  return (
    <option value={option.value}>{option.label}</option>
  )
}