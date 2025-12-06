import { API_URL as baseUrl } from "@/config"

// Types
import * as AppTypes from '@/context/App/types'

// Get missions
// GET /api/v2/pd/drone/mission?department=
export const getMissions = async (params: URLSearchParams, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.MissionInterface[] }> => {
  const res = await fetch(`${ baseUrl }/mission?${ params }`, { headers })

  return await res.json()
}

// Get mission
// GET /api/v2/pd/drone/mission/:uuid
export const getMission = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.MissionInterface }> => {
  const res = await fetch(`${ baseUrl }/mission/${ uuid }`, { headers })

  return await res.json()
}

// Create mission
// POST /api/v2/pd/drone/mission
export const createMission = async (formData: AppTypes.MissionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.MissionInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/mission`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update mission
// PUT /api/v2/pd/drone/mission/:uuid
export const updateMission = async (formData: AppTypes.MissionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/mission/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete mission
// DELETE /api/v2/pd/drone/mission/:uuid
export const deleteMission = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/mission/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create flight
// POST /api/v2/pd/drone/flight
export const createFlight = async (formData: AppTypes.FlightCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.FlightInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/flight`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update flight
// PUT /api/v2/pd/drone/flight/:uuid
export const updateFlight = async (formData: AppTypes.FlightCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/flight/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete flight
// DELETE /api/v2/pd/drone/flight/:uuid
export const deleteFlight = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/flight/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create vehicle
// POST /api/v2/pd/drone/vehicle
export const createVehicle = async (formData: AppTypes.VehicleCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.VehicleInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vehicle`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vehicle
// PUT /api/v2/pd/drone/vehicle/:uuid
export const updateVehicle = async (formData: AppTypes.VehicleCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vehicle/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete vehicle
// DELETE /api/v2/pd/drone/vehicle/:uuid
export const deleteVehicle = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vehicle/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create battery
// POST /api/v2/pd/drone/battery
export const createBattery = async (formData: AppTypes.BatteryCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.BaseInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/battery`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update battery
// PUT /api/v2/pd/drone/battery/:uuid
export const updateBattery = async (formData: AppTypes.BatteryCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/battery/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete battery
// DELETE /api/v2/pd/drone/battery/:uuid
export const deleteBattery = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/battery/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create personnel
// POST /api/v2/pd/drone/personnel
export const createPersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update personnel
// PUT /api/v2/pd/drone/personnel/:uuid
export const updatePersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete personnel
// DELETE /api/v2/pd/drone/personnel/:uuid
export const deletePersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create inspection
// POST /api/v2/pd/drone/inspection
export const createInspection = async (formData: AppTypes.InspectionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.InspectionInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/inspection`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update inspection
// PUT /api/v2/pd/drone/inspection/:uuid
export const updateInspection = async (formData: AppTypes.InspectionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/inspection/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create temporary flight restriction (TFR)
// POST /api/v2/pd/drone/tfr
export const createTFR = async (formData: AppTypes.TemporaryFlightRestrictionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.TemporaryFlightRestrictionInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/tfr`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update temporary flight restriction (TFR)
// PUT /api/v2/pd/drone/tfr/:uuid
export const updateTFR = async (formData: AppTypes.TemporaryFlightRestrictionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/tfr/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete temporary flight restriction (TFR)
// DELETE /api/v2/pd/drone/tfr/:uuid
export const deleteTFR = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/tfr/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create weather
// POST /api/v2/pd/drone/weather
export const createWeather = async (formData: AppTypes.WeatherCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.WeatherInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/weather`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update weather
// PUT /api/v2/pd/drone/weather/:uuid
export const updateWeather = async (formData: AppTypes.WeatherCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/weather/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get roster vehicles
// GET /api/v2/pd/drone/vehicle-roster?department=
export const getRosterVehicles = async (params: URLSearchParams, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.VehicleRosterInterface[] }> => {
  const res = await fetch(`${ baseUrl }/vehicle-roster?${ params }`, { headers })

  return await res.json()
}

// Get vehicle
// GET /api/v2/pd/drone/vehicle-roster/:uuid
export const getVehicle = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.VehicleRosterInterface }> => {
  const res = await fetch(`${ baseUrl }/vehicle-roster/${ uuid }`, { headers })

  return await res.json()
}

// Create roster vehicle
// POST /api/v2/pd/drone/vehicle-roster
export const createRosterVehicle = async (formData: AppTypes.VehicleRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.VehicleRosterInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/vehicle-roster`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update roster vehicle
// PUT /api/v2/pd/drone/vehicle-roster/:uuid
export const updateRosterVehicle = async (formData: AppTypes.VehicleRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vehicle-roster/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete roster vehicle
// DELETE /api/v2/pd/drone/vehicle-roster/:uuid
export const deleteRosterVehicle = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vehicle-roster/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Get roster batteries
// GET /api/v2/api/pd/drone/battery-roster
export const getRosterBatteries = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.BatteryRosterInterface[] }> => {
  const res = await fetch(`${ baseUrl }/battery-roster`, { headers })

  return await res.json()
}

// Get battery
// GET /api/v2/api/pd/drone/battery-roster/:uuid
export const getBattery = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.BatteryRosterInterface }> => {
  const res = await fetch(`${ baseUrl }/battery-roster/${ uuid }`, { headers })

  return await res.json()
}

// Create roster battery
// POST /api/v2/pd/drone/battery-roster
export const createRosterBattery = async (formData: AppTypes.BatteryRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.BatteryRosterInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/battery-roster`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update roster battery
// PUT /api/v2/pd/drone/battery-roster/:uuid
export const updateRosterBattery = async (formData: AppTypes.BatteryRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/battery-roster/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete roster battery
// DELETE /api/v2/pd/drone/battery-roster/:uuid
export const deleteRosterBattery = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/battery-roster/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Get roster personnel
// GET /api/v2/api/pd/drone/personnel-roster?department=
export const getRosterPersonnel = async (params: URLSearchParams, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface[] }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster?${ params }`, { headers })

  return await res.json()
}

// Get person
// GET /api/v2/pd/drone/personnel-roster/:uuid
export const getPerson = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, { headers })

  return await res.json()
}

// Create roster personnel
// POST /api/v2/pd/drone/personnel-roster
export const createRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/personnel-roster`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update roster personnel
// PUT /api/v2/pd/drone/personnel-roster/:uuid
export const updateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel-roster/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete roster personnel
// DELETE /api/v2/pd/drone/personnel-roster/:uuid
export const deleteRosterPersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}