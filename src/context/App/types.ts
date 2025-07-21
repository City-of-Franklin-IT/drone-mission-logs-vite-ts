export interface MissionInterface extends BaseInterface {
  missionDate: string
  incidentNumber: string | null
  missionDescription: string
  location: string
  Flights?: FlightInterface[]
  Personnel?: PersonnelInterface[]
  Weather?: WeatherInterface
  Inspection?: InspectionInterface
  TemporaryFlightRestriction?: TemporaryFlightRestrictionInterface
  Vehicle?: VehicleInterface
}

export interface MissionCreateInterface extends Omit<MissionInterface, 'Flights' | 'Personnel' |  'Weather' | 'Inspection' | 'TemporaryFlightRestriction' | 'Vehicle' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  Flights?: FlightCreateInterface[]
  Personnel?: PersonnelCreateInterface[]
  Weather?: WeatherCreateInterface
  Inspection?: InspectionCreateInterface
  TemporaryFlightRestriction?: TemporaryFlightRestrictionCreateInterface
  Vehicle?: VehicleCreateInterface
  uuid?: string
}

export interface FlightInterface extends BaseInterface {
  parentId: string
  takeOffDateTime: string
  landingDateTime: string
}

export interface FlightCreateInterface extends Omit<FlightInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface InspectionInterface extends BaseInterface {
  parentId: string
  preFlight: boolean | null
  postFlight: boolean | null
}

export interface InspectionCreateInterface extends Omit<InspectionInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  uuid?: string
}

export interface PersonnelInterface extends BaseInterface {
  parentId: string
  email: string
  isPilot: boolean | null
}

export interface PersonnelCreateInterface extends Omit<PersonnelInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface TemporaryFlightRestrictionInterface extends BaseInterface {
  parentId: string
  temporaryFlightRestriction: string | null
  source: string | null
}

export interface TemporaryFlightRestrictionCreateInterface extends Omit<TemporaryFlightRestrictionInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface VehicleInterface extends BaseInterface {
  parentId: string
  registration: string
  VehicleRoster?: VehicleRosterInterface
  Batteries?: BatteryInterface[]
}

export interface VehicleCreateInterface extends Omit<VehicleInterface, 'VehicleRoster' | 'Batteries' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  Batteries?: BatteryCreateInterface[]
  uuid?: string
}

export interface VehicleRosterInterface extends BaseInterface {
  model: string
  registration: string
}

export interface VehicleRosterCreateInterface extends Omit<VehicleRosterInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface WeatherInterface extends BaseInterface {
  parentId: string
  temperature: number | null
  wind: number | null
  visibility: VisibilityType | null
  source: string | null
}

export interface WeatherCreateInterface extends Omit<WeatherInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  uuid?: string
}

export interface BatteryInterface extends BaseInterface {
  parentId: string
  batteryName: string
}

export interface BatteryCreateInterface extends Omit<BatteryInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface BatteryRosterInterface extends BaseInterface {
  batteryName: string
}

export interface BatteryRosterCreateInterface extends Omit<BatteryRosterInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean | null
  uuid?: string
}

export interface PersonnelRosterInterface extends BaseInterface {
  email: string
}

export interface PersonnelRosterCreateInterface extends Omit<PersonnelRosterInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean | null
  uuid?: string
}

export type VisibilityType = 
  | "clear"
  | "partly cloudy"
  | "mostly cloudy"
  | "overcast"

export interface BaseInterface {
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export interface ServerResponse {
  success: boolean
  msg?: string
}