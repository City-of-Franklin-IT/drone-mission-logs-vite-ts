import { faker } from '@faker-js/faker'

// Types
import * as AppTypes from '@/context/App/types'

export const createMockMission = (): AppTypes.MissionInterface => ({
  missionDate: faker.date.anytime().toISOString().split('T')[0],
  incidentNumber: faker.string.alphanumeric({ length: 10 }),
  missionDescription: faker.lorem.paragraph(),
  location: faker.location.streetAddress({ useFullAddress: false }),
  Flights: Array.from({ length: 3 }).map(() => createMockFlight()),
  Personnel: [ createMockPersonnel() ],
  Weather: createMockWeather(),
  Inspection: createMockInspection(),
  TemporaryFlightRestriction: createMockTFR(),
  Vehicle: createMockVehicle(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockFlight = (overrides?: Partial<AppTypes.FlightInterface>): AppTypes.FlightInterface => ({
  parentId: faker.string.uuid(),
  takeOffDateTime: faker.date.past().toISOString(),
  landingDateTime: faker.date.future().toISOString(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockPersonnel = (): AppTypes.PersonnelInterface => ({
  parentId: faker.string.uuid(),
  email: faker.internet.email(),
  isPilot: true,
  Mission: undefined,
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockWeather = (): AppTypes.WeatherInterface => ({
  parentId: faker.string.uuid(),
  temperature: faker.number.int({ min: 30, max: 100 }),
  wind: faker.number.int({ min: 0, max: 20 }),
  visibility: faker.helpers.arrayElement(['clear', 'partly cloudy', 'mostly cloudy', 'overcast']),
  source: 'NOAA',
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockInspection = (): AppTypes.InspectionInterface => ({
  parentId: faker.string.uuid(),
  preFlight: true,
  postFlight: true,
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockTFR = (): AppTypes.TemporaryFlightRestrictionInterface => ({
  parentId: faker.string.uuid(),
  temporaryFlightRestriction: faker.string.uuid(),
  source: 'FAA',
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockVehicle = (): AppTypes.VehicleInterface => ({
  parentId: faker.string.uuid(),
  registration: faker.string.alphanumeric({ length: 10 }),
  VehicleRoster: undefined,
  Mission: undefined,
  Batteries: Array.from({ length: 2 }).map((_, index) => createMockBattery(index)),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockBattery = (index: number): AppTypes.BatteryInterface => ({
  parentId: faker.string.uuid(),
  batteryName: `Battery #${ index + 1 }}`,
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})

export const createMockRosterPersonnel = (): AppTypes.PersonnelRosterInterface => ({
  email: faker.internet.email(),
  Personnel: [],
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid()
})