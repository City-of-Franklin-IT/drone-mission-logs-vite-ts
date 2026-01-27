import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateMission = async (formData: AppTypes.MissionCreateInterface, token: string) => {
  const result = await AppActions.createMission(formData, authHeaders(token))

  if(result.success) {
    const parentId = result.data.uuid

    if(formData.ResponseOnly?._checked) { // Response only
      await AppActions.createResponseOnly({ parentId }, authHeaders(token))

      const personnel = formData.Personnel || []

      await Promise.all( // Personnel
        personnel.map(item => {
          if(item.email) {
            return AppActions.createPersonnel({ ...item, parentId: result.data.uuid }, authHeaders(token))
          }
        })
      )

      return result
    }

    if(formData.Vehicle?.registration) { // Vehicle
      const vehicle = await AppActions.createVehicle({ ...formData.Vehicle, parentId: result.data.uuid }, authHeaders(token))

      if(vehicle.success) {
        const batteries = formData.Vehicle.Batteries || []

        await Promise.all( // Batteries
          batteries.map(battery => {
            if(battery.batteryName) {
              return AppActions.createBattery({ ...battery, parentId: vehicle.data.uuid }, authHeaders(token))
            }
          })
        )
      }
    }

    const flights = formData.Flights || []

    await Promise.all( // Flights
      flights.map(item => {
        if(item.takeOffDateTime && item.landingDateTime) {
          const flight = { takeOffDateTime: new Date(item.takeOffDateTime).toISOString(), landingDateTime: new Date(item.landingDateTime).toISOString(), parentId: result.data.uuid }
          return AppActions.createFlight(flight, authHeaders(token))
        }
      })
    )

    const personnel = formData.Personnel || []

    await Promise.all( // Personnel
      personnel.map(item => {
        if(item.email) {
          return AppActions.createPersonnel({ ...item, parentId: result.data.uuid }, authHeaders(token))
        }
      })
    )

    const weather = formData.Weather

    if(weather) { // Weather
      await AppActions.createWeather({ ...weather, parentId: result.data.uuid }, authHeaders(token))
    }

    const inspection = formData.Inspection

    if(inspection) { // Inspection
      await AppActions.createInspection({ ...inspection, parentId: result.data.uuid }, authHeaders(token))
    }

    const tfr = formData.TemporaryFlightRestriction

    if(tfr) { // Temporary flight restriction
      await AppActions.createTFR({ ...tfr, parentId: result.data.uuid }, authHeaders(token))
    }
  }

  return result
}