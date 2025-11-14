import { Controller } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'
import { useHandlePilotSelect, useHandleSupportPersonnelInput, useHandlePersonnelOptions } from "./hooks"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const Header = () => {

  return (
    <h3 className="text-3xl text-neutral-content font-[play]">Personnel</h3>
  )
}

export const PilotSelect = () => {
  const { methods, isLoading } = useHandlePilotSelect()

  if(isLoading) return

  return (
    <Controller
      control={methods.control}
      name={`Personnel.${ 0 }.email`}
      rules={{
        required: 'Pilot email is required',
        validate: value => {
          const supportPersonnel = methods.getValues(`Personnel.${ 1 }.email`)
          if(value === supportPersonnel) {
            return 'Pilot cannot be the same as support personnel'
          }

          return true
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col bg-neutral xl:flex-row">
            <FormLabel
              name={field.name}
              required={true}>
                Pilot Email:
            </FormLabel>
            <select 
              className={styles.input}
              { ...field }
              onChange={(e) => {
                field.onChange(e)
                methods.setValue(`Personnel.${ 0 }._dirtied`, true)
                methods.setValue(`Personnel.${ 0 }.isPilot`, true)
              }}>
                <PersonnelOptions />
            </select>
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

export const SupportPersonnelInput = () => {
  const { methods, visible, removeBtnProps } = useHandleSupportPersonnelInput()

  if(!visible) return

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={methods.control}
        name={`Personnel.${ 1 }.email`}
        rules={{
          validate: (value) => {
            if(!value) return true

            const pilot = methods.getValues(`Personnel.${ 0 }.email`)
            if(value === pilot) {
              
              return 'Support personnel cannot be the same as pilot'
            }
            return true
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <div className="flex flex-col bg-neutral xl:flex-row">
              <FormLabel name={field.name}>
                Support Email:
              </FormLabel>
              <select 
                className={styles.input}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  methods.setValue(`Personnel.${1}._dirtied`, true)
                }}>
                  <PersonnelOptions />
              </select>
            </div>
            <FormError error={error?.message} />
          </div>
        )} />
        <RemoveBtn { ...removeBtnProps } />
    </div>
  )
}

export const PersonnelOptions = () => {
  const { isLoading, personnel } = useHandlePersonnelOptions()

  if(isLoading) return

  return (
    <>
      <option value=""></option>
      {personnel.map(item => (
        <PersonnelOption
          key={`personnel-option-${ item.uuid }`}
          personnel={item} />
      ))}
    </>
  )
}

export const PersonnelOption = ({ personnel }: { personnel: AppTypes.PersonnelRosterInterface }) => {
  if(!personnel) return

  return (
    <option value={personnel.email}>{personnel.email}</option>
  )
}