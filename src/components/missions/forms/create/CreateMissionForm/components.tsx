import { useCreateMissionCtx, useHandleBatteryInputs, useHandleAddBatteryBtn, useHandleAddFlightBtn, useHandleResponseOnly } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import CreateVehicleForm from "../CreateVehicleForm"
import CreateBatteryForm from "../CreateBatteryForm"
import CreateFlightForm from "../CreateFlightForm"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h2 className="text-neutral-content text-4xl font-[play] font-normal text-center py-6 whitespace-nowrap">{children}</h2>
  )
}

export const MissionDetailInputs = () => {

  return (
    <div className="flex flex-col gap-4 mx-auto p-6 border-2 border-info/10 w-full rounded-xl xl:p-10 xl:w-4/5">
      <div className="flex gap-6 flex-wrap justify-between">
        <MissionDateInput />
        <IncidentNumberInput />
        <LocationInput />
      </div>
      <MissionDescriptionInput />
    </div>
  )
}

export const ResponseOnlyInput = () => {
  const { register, watch, setValue } = useCreateMissionCtx()

  const isUpdateMode = !!watch('uuid')
  const isResponseOnly = !!watch('ResponseOnly._checked')

  const onResponseOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('ResponseOnly._dirtied', true)

    if(e.target.checked) {
      setValue('Vehicle', { registration: '', parentId: '', Batteries: [{ batteryName: '', parentId: '' }, { batteryName: '', parentId: '' }] })
      setValue('Flights', [{ takeOffDateTime: '', landingDateTime: '', parentId: '' }])
      setValue('Inspection', { preFlight: null, postFlight: null, parentId: '' })
      setValue('Weather', { temperature: null, visibility: null, wind: null, source: '', parentId: '' })
      setValue('TemporaryFlightRestriction', undefined)
    }
  }

  if(isUpdateMode && !isResponseOnly) return null

  return (
    <div className="flex flex-col gap-2 items-center mt-10">
      <label className="text-xl text-neutral-content font-[play]">Response Only:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-secondary"
        disabled={isUpdateMode}
        { ...register('ResponseOnly._checked', { onChange: onResponseOnlyChange }) } />
    </div>
  )
}

export const VehicleInputs = () => {
  const visible = useHandleResponseOnly()

  if(!visible) return null

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
  const visible = useHandleResponseOnly()

  if(!visible) return null

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

  const visible = useHandleResponseOnly()

  if(!visible) return null

  return (
    <div className="flex flex-col gap-2 items-center mt-10">
      <label className="text-xl text-neutral-content font-[play]">Preflight Inspection:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
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

  const visible = useHandleResponseOnly()

  if(!visible) return null

  return (
    <div className="flex flex-col gap-2 items-center my-10">
      <label className="text-xl text-neutral-content font-[play]">Postflight Inspection:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={checked}
        { ...register('Inspection.postFlight', {
          onChange: () => setValue('_dirtied', true)
        }) } />
    </div>
  )
}

const MissionDateInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col">
        <FormLabel
          name={'missionDate'}
          required={true}>
            Mission Date:
        </FormLabel>
        <input
          type="date"
          className="input w-full hover:cursor-pointer"
          { ...register('missionDate', {
            required: 'Mission date is required',
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.missionDate?.message} />
    </div>
  )
}

const IncidentNumberInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-2 flex flex-col gap-4">
      <div className="flex flex-col">
        <FormLabel name={'incidentNumber'}>
          Incident #:
        </FormLabel>
        <input
          type="text"
          className="input w-full"
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

const LocationInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="flex-2 flex flex-col gap-4">
      <div className="flex flex-col">
        <FormLabel name={'location'}>
          Location:
        </FormLabel>
        <input
          type="text"
          className="input w-full"
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

const MissionDescriptionInput = () => {
  const { register, formState: { errors }, setValue } = useCreateMissionCtx()

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <FormLabel name={'missionDescription'} required={true}>
          Mission Description:
        </FormLabel>
        <textarea
          className="textarea w-full"
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

const BatteryInputs = () => {
  const { visible, batteries } = useHandleBatteryInputs()

  if(!visible) return null

  return (
    <div className="flex flex-col items-center gap-4">
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
  const onClick = useHandleAddBatteryBtn()

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
  const onClick = useHandleAddFlightBtn()

  return (
    <button 
      type="button"
      className="btn btn-primary uppercase shadow-xl"
      onClick={onClick}>
        Add Flight
    </button>
  )
}