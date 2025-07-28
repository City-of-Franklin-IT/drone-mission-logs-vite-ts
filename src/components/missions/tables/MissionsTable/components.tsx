import { useState, useContext } from 'react'
import MissionsCtx from '../../context'
import { setFlightTimes, iconMap } from './utils'
import { useDescriptionVisibility } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

export const Table = ({ tableData }: { tableData: AppTypes.MissionInterface[] }) => {

  return (
    <table className="table text-neutral-content font-[play] w-full">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

const TableHeaders = () => {
  const descriptionVisible = useDescriptionVisibility()

  return (
    <thead>
      <tr className="text-warning uppercase bg-neutral/50 border-b-2 border-warning">
        <th className="px-4">Date</th>
        <th>Location</th>
        <th className={`${ !descriptionVisible ? 'hidden' : 'block' }`}>Description</th>
        <th className="text-center px-4">Personnel</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.MissionInterface[] }) => { // Projects table body

  return (
    <tbody>
      {tableData.map((mission, index) => {
        return (
          <TableRow
            key={`table-row-${ mission.uuid }`}
            tableData={mission}
            index={index} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ tableData, index }: { tableData: AppTypes.MissionInterface, index: number }) => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  const descriptionVisible = useDescriptionVisibility()

  const btnIcon = !state.expanded ? iconMap.get('downArrow') : iconMap.get('upArrow')

  return (
    <>
      <tr className={`border-0 border-t-1 border-neutral-content ${ index % 2 === 0 ? 'bg-neutral/20' : null }`} data-uuid={tableData.uuid}>
        <td className="px-4 whitespace-nowrap">{tableData.missionDate}</td>
        <td className="whitespace-nowrap">{tableData.location}</td>
        <td className={`${ !descriptionVisible ? 'hidden' : 'block' }`}>{tableData.missionDescription}</td>
        <td><PersonnelTableData personnel={tableData.Personnel} /></td>
      </tr>
      <ShowDetailsBtn 
        onClick={() => setState(prevState => ({ expanded: !prevState.expanded }))}
        index={index}>
          <img src={btnIcon} alt="show details btn icon" className="w-[20px]" />
      </ShowDetailsBtn>
      <MissionDetails
        expanded={state.expanded} 
        tableData={tableData}
        index={index} />
    </>
  )
}

type ShowDetailsBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, index: number, children: React.ReactNode }

const ShowDetailsBtn = (props: ShowDetailsBtnProps) => {

  return (
    <tr className={`${ props.index % 2 === 0 ? 'bg-neutral/20' : null }`}>
      <td colSpan={4}>
        <div className="flex justify-around">
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={props.onClick}>
              {props.children}
          </button>
        </div>
      </td>
    </tr>
  )
}

const PersonnelTableData = ({ personnel }: { personnel: AppTypes.PersonnelInterface[] | undefined }) => {
  if(!personnel) return

  return (
    <div className="flex flex-col mx-auto px-4 items-center">
      {personnel.map(item => (
        <Personnel
          key={`personnel-${ item.uuid }`}
          personnel={item} />
      ))}
    </div>
  )
}

const Personnel = ({ personnel }: { personnel: AppTypes.PersonnelInterface }) => {
  const lastName = personnel.email.split('@')[0].split('.')[1]

  return (
    <div className={`flex gap-2 items-center uppercase ${ personnel.isPilot ? 'font-bold' : 'italic' }`}>
      <span>{lastName}</span>
      <PilotIcon isPilot={personnel.isPilot} />
    </div>
  )
}

const PilotIcon = ({ isPilot }: { isPilot: boolean | null }) => {
  if(!isPilot) return

  return (
    <img src={iconMap.get('pilot')} alt="pilot icon" className="w-[30px]" title="Pilot" />
  )
}

const MissionDetails = ({ expanded , tableData, index }: { expanded: boolean, tableData: AppTypes.MissionInterface, index: number }) => {
  if(!expanded) return

  return (
    <tr className={`text-center ${ index % 2 === 0 ? 'bg-neutral/20' : null }`}>
      <td colSpan={4}>
        <div className="flex flex-col gap-4 mx-auto w-fit p-4 border-2 border-info/10 rounded-xl xl:max-w-1/2">
          <Vehicle vehicle={tableData.Vehicle} />
          <Flights flights={tableData.Flights} />
          <Weather weather={tableData.Weather} />
          <Inspections inspection={tableData.Inspection} />
          <TemporaryFlightRestriction tfr={tableData.TemporaryFlightRestriction} />
          <UpdateMissionBtn uuid={tableData.uuid} />
        </div>
      </td>
    </tr>
  )
}

type DetailItemContentProps = { icon: string, children: React.ReactNode }

const DetailItemContent = (props: DetailItemContentProps) => {

  return (
    <div className="flex gap-2 items-center" title={props.icon.toUpperCase()}>
      <img src={iconMap.get(props.icon)} alt={`${ props.icon } icon`} className="w-[20px]" />  
      <small>{props.children}</small>
    </div>
  )
}

const Vehicle = ({ vehicle }: { vehicle: AppTypes.VehicleInterface | undefined }) => {
  if(!vehicle) return

  return (
    <div className="flex flex-col gap-2 items-center mx-auto p-2 px-3 bg-info/10 rounded w-full">
      <h3 className="text-info font-bold text-center uppercase">Vehicle:</h3>

      <div className="flex gap-10 p-2">
        <VehicleModel model={vehicle.VehicleRoster?.model} />
        <VehicleRegistration registration={vehicle.registration} />
        <Batteries batteries={vehicle.Batteries} />
      </div>
    </div>
  )
}

const VehicleModel = ({ model }: { model: string | undefined }) => {
  if(!model) return

  return (
    <DetailItemContent icon={'drone'}>
      {model}
    </DetailItemContent>
  )
}

const VehicleRegistration = ({ registration }: { registration: string }) => {

  return (
    <DetailItemContent icon={'registration'}>
      {registration}
    </DetailItemContent>
  )
}

const Batteries = ({ batteries }: { batteries: AppTypes.BatteryInterface[] | undefined }) => {
  if(!batteries) return

  return (
    <DetailItemContent icon={'battery'}>
      <div className="flex flex-col text-center">
        {batteries.map(battery => (
          <span key={`battery-${ battery.uuid }`}>{battery.batteryName}</span>
        ))}
      </div>
    </DetailItemContent>
  )
}

const Flights = ({ flights }: { flights: AppTypes.FlightInterface[] | undefined }) => {
  if(!flights) return

  return (
    <div className="flex flex-col gap-2 items-center mx-auto p-2 px-3 bg-info/10 rounded w-full">
      <h3 className="text-info font-bold text-center uppercase">Flights:</h3>

      <div className="flex flex-col gap-2">
        {flights.map(flight => (
          <Flight
            key={`flight-${ flight.uuid }`}
            flight={flight} />
        ))}
      </div>
    </div>
  )
}

const Flight = ({ flight }: { flight: AppTypes.FlightInterface }) => {
  const { takeoffTime, landingTime, duration } = setFlightTimes(flight)

  return (
    <div className="flex gap-10">
      <div className="flex gap-10 p-2">
        <Takeoff takeOffTime={takeoffTime} />
        <Landing landingTime={landingTime} />
        <Duration duration={duration} />
      </div>
    </div>
  )
}

const Takeoff = ({ takeOffTime }: { takeOffTime: string }) => {

  return (
    <DetailItemContent icon={'takeoff'}>
      {takeOffTime}
    </DetailItemContent>
  )
}

const Landing = ({ landingTime }: { landingTime: string }) => {

  return (
    <DetailItemContent icon={'landing'}>
      {landingTime}
    </DetailItemContent>
  )
}

const Duration = ({ duration }: { duration: string }) => {

  return (
    <DetailItemContent icon={'time'}>
      {duration}
    </DetailItemContent>
  )
}

const Weather = ({ weather }: { weather: AppTypes.WeatherInterface | undefined }) => {
  if(!weather) return

  return (
    <div className="flex flex-col gap-2 mx-auto p-2 px-3 bg-info/10 rounded w-full">
      <div className="flex flex-col items-center">
        <h3 className="text-info font-bold text-center uppercase">Weather:</h3>
        <small className="italic">Source: {weather.source}</small>
      </div>

      <div className="flex gap-10 p-2 mx-auto">
        <Temperature temperature={weather.temperature} />
        <WindSpeed wind={weather.wind} />
        <Visibility visibility={weather.visibility} />
      </div>
    </div>
  )
}

const Temperature = ({ temperature }: { temperature: number | null }) => {
  if(!temperature) return

  return (
    <DetailItemContent icon={'temperature'}>
      {temperature} °F
    </DetailItemContent>
  )
}

const WindSpeed = ({ wind }: { wind: number | null }) => {
  if(!wind) return

  return (
    <DetailItemContent icon={'wind'}>
      {wind} mph.
    </DetailItemContent>
  )
}

const Visibility = ({ visibility }: { visibility: AppTypes.VisibilityType | null }) => {
  if(!visibility) return

  return (
    <DetailItemContent icon={'clouds'}>
      {visibility}
    </DetailItemContent>
  )
}

const Inspections = ({ inspection }: { inspection: AppTypes.InspectionInterface | undefined }) => {
  if(!inspection) return

  return (
    <div className="flex flex-col gap-2 items-center mx-auto p-2 px-3 bg-info/10 rounded w-full">
      <h3 className="text-info font-bold text-center uppercase">Inspections:</h3>

      <div className="flex gap-10 p-2">
        <Inspection checked={inspection.preFlight}>
          Preflight:
        </Inspection>
        <Inspection checked={inspection.postFlight}>
          Postflight:
        </Inspection>
      </div>
    </div>
  )
}

type InspectionType = { checked: boolean | null, children: React.ReactNode }

const Inspection = (props: InspectionType) => {
  const iconSrc = !props.checked ? 'not passed' : 'passed'

  if(!iconSrc) return

  return (
    <DetailItemContent icon={iconSrc}>
      {props.children}
    </DetailItemContent>
  )
}

const TemporaryFlightRestriction = ({ tfr }: { tfr: AppTypes.TemporaryFlightRestrictionInterface | undefined }) => {
  if(!tfr) return

  return (
    <div className="flex flex-col gap-2 items-center mx-auto p-2 px-3 bg-info/10 rounded w-full">
      <div className="flex flex-col items-center">
        <h3 className="text-info font-bold text-center uppercase">Temporary Flight Restriction:</h3>
        <small className="italic">Source: {tfr.source}</small>
      </div>

      <span className="italic p-4">{tfr.temporaryFlightRestriction}</span>
    </div>
  )
}

const UpdateMissionBtn = ({ uuid }: { uuid: string }) => {
  const { dispatch } = useContext(MissionsCtx)

  return (
    <button 
      type="button"
      className="btn btn-secondary uppercase w-full"
      onClick={() => dispatch({ type: 'SET_MISSION_UUID', payload: uuid })}>
        Update Mission
    </button>
  )
}