import { useFieldArray } from "react-hook-form"
import { useCreateMissionCtx } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import CreateVehicleForm from "../CreateVehicleForm"
import CreateBatteryForm from "../CreateBatteryForm"
import CreateFlightForm from "../CreateFlightForm"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h2 className={styles.title}>{children}</h2>
  )
}

export const MissionDateInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col bg-neutral xl:flex-row">
        <FormLabel
          name={'missionDate'}
          required={true}>
            Mission Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register('missionDate', {
            required: 'Mission date is required',
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.missionDate?.message} />
    </div>
  )
}

export const IncidentNumberInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-2 flex flex-col gap-4">
      <div className="flex flex-col bg-neutral xl:flex-row">
        <FormLabel name={'incidentNumber'}>
          Incident #:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('incidentNumber', {
            maxLength: {
              value: 50,
              message: 'Incident number must be 50 characters or less'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.incidentNumber?.message} />
    </div>
  )
}

export const MissionDescriptionInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col bg-neutral xl:flex-row">
        <FormLabel 
          name={'missionDescription'}
          required={true}>
            Mission Description:
        </FormLabel>
        <textarea 
          className={styles.input}
          rows={4}
          { ...register('missionDescription', {
            required: 'Mission description is required',
            onChange: () => setValue('_dirtied', true)
          }) }></textarea>
      </div>
      <FormError error={errors.missionDescription?.message} />
    </div>
  )
}

export const LocationInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-2 flex flex-col gap-4">
      <div className="flex flex-col bg-neutral xl:flex-row">
        <FormLabel name={'location'}>
          Location:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register('location', {
            maxLength: {
              value: 255,
              message: 'Location must be 255 characters or less'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.location?.message} />
    </div>
  )
}

export const VehicleInputs = () => {

  return (
    <div className="flex flex-col gap-4 items-center mt-10 p-6 w-full border-2 border-info/10 rounded-xl xl:p-10">
      <h3 className="text-3xl text-neutral-content font-[play]">Vehicle</h3>

      <div className="flex flex-col gap-10 w-full">
        <CreateVehicleForm />
        <BatteryInputs />
      </div>
      
    </div>
  )
}

export const FlightInputs = () => {

  return (
    <div className="flex flex-col gap-4 items-center mt-10 p-6 mx-auto w-full border-2 border-info/10 rounded-xl xl:p-10">
      <h3 className="text-3xl text-neutral-content font-[play]">Flights</h3>

      <Flights />
    </div>
  )
}

export const PreflightInspectionInput = () => {
  const { register, watch, setValue } = useCreateMissionCtx()

  const checked = !!watch('Inspection.preFlight')

  return (
    <div className="flex flex-col gap-2 items-center mt-10">
      <label className="text-xl text-neutral-content font-[play]">Preflight Inspection:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={checked}
        { ...register('Inspection.preFlight', {
          onChange: () => setValue(`Inspection._dirtied`, true)
        }) } />
    </div>
  )
}

export const PostflightInspectionInput = () => {
  const { register, watch, setValue } = useCreateMissionCtx()

  const checked = !!watch('Inspection.postFlight')

  return (
    <div className="flex flex-col gap-2 items-center my-10">
      <label className="text-xl text-neutral-content font-[play]">Postflight Inspection:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={checked}
        { ...register('Inspection.postFlight', {
          onChange: () => setValue('_dirtied', true)
        }) } />
    </div>
  )
}

const BatteryInputs = () => {
  const { watch } = useCreateMissionCtx()

  const vehicle = watch('Vehicle.registration')

  const batteries = watch('Vehicle.Batteries') || []

  if(!vehicle) return

  return (
    <div className="flex flex-col gap-4">
      {batteries.map((_, index) => (
        <CreateBatteryForm
          key={`battery-form-${ index }`}
          index={index} />
      ))}
      <AddBatteryBtn />
    </div>
  )
}

const AddBatteryBtn = () => {
  const { control } = useCreateMissionCtx()

  const { append } = useFieldArray({
    control,
    name: 'Vehicle.Batteries'
  })

  const onClick = () => {
    append({ batteryName: '', parentId: '' })
  }

  return (
    <button 
      type="button"
      className="btn btn-primary uppercase shadow-xl"
      onClick={onClick}>
        Add Battery
    </button>
  )
}

const Flights = () => {
  const { watch } = useCreateMissionCtx()

  const flights = watch('Flights') || []

  return (
    <div className="flex flex-col gap-10 w-full">
      {flights.map((_, index) => (
        <div key={`flight-form-${ index }`} className="flex flex-col gap-4 p-6 bg-info/10">
          <span className="font-[play] text-neutral-content text-start underline">Flight #{index + 1}</span>
          <CreateFlightForm index={index} />
        </div>
      ))}
      <AddFlightBtn />
    </div>
  )
}

const AddFlightBtn = () => {
  const { control } = useCreateMissionCtx()

  const { append } = useFieldArray({
    control,
    name: 'Flights'
  })

  const onClick = () => {
    append({ takeOffDateTime: '', landingDateTime: '', parentId: '' })
  }

  return (
    <button 
      type="button"
      className="btn btn-primary uppercase shadow-xl"
      onClick={onClick}>
        Add Flight
    </button>
  )
}