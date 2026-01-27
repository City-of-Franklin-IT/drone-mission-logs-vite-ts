import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const utcToLocalDatetime = (utcDateTime: string) => {
    const date = new Date(utcDateTime)
    const offsetMs = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - offsetMs)

    return localDate.toISOString().slice(0, 16)
}

export const handleUpdateMission = async (formData: AppTypes.MissionCreateInterface, token: string) => {
    if(formData._dirtied) { // Mission
        await AppActions.updateMission(formData, authHeaders(token))
    }

    if(formData.ResponseOnly?._dirtied) { // Response only
        if(formData.ResponseOnly._checked && !formData.ResponseOnly.uuid) {
            await AppActions.createResponseOnly({ parentId: String(formData.uuid) }, authHeaders(token))
        } else if(!formData.ResponseOnly._checked && formData.ResponseOnly.uuid) {
            await AppActions.deleteResponseOnly(String(formData.ResponseOnly.uuid), authHeaders(token))
        }
    }

    if(formData.Vehicle?._dirtied) { // Vehicle
        await AppActions.updateVehicle(formData.Vehicle, authHeaders(token))
    }

    if(formData.Inspection?._dirtied) { // Inspection
        await AppActions.updateInspection(formData.Inspection, authHeaders(token))
    }

    if(formData.Weather?._dirtied) { // Weather
        await AppActions.updateWeather(formData.Weather, authHeaders(token))
    }

    if(formData.TemporaryFlightRestriction?._dirtied || formData.TemporaryFlightRestriction?._deleted) {
        if(formData.TemporaryFlightRestriction._deleted) { // Delete existing
            await AppActions.deleteTFR(formData.TemporaryFlightRestriction.uuid as string, authHeaders(token))
        }
        if(formData.TemporaryFlightRestriction.uuid) { // Update existing
            await AppActions.updateTFR(formData.TemporaryFlightRestriction, authHeaders(token))
        } else { // Create new
            await AppActions.createTFR({ ...formData.TemporaryFlightRestriction, parentId: formData.uuid as string }, authHeaders(token))
        }
    }

    const personnel = formData.Personnel?.filter(item => (item._dirtied && item.email) || item._deleted) || []

    await Promise.all( // Personnel
        personnel.map(item => {
            if(item._deleted) { // Delete existing
                return AppActions.deletePersonnel(item.uuid as string, authHeaders(token))
            }
            if(item.uuid) { // Update existing
                return AppActions.updatePersonnel(item, authHeaders(token))
            } else { // Create new
                return AppActions.createPersonnel({ ...item, parentId: formData.uuid as string }, authHeaders(token))
            }
        })
    )

    const flights = formData.Flights?.filter(flight => (flight._dirtied && flight.takeOffDateTime && flight.landingDateTime) || flight._deleted) || []

    await Promise.all(
        flights.map(flight => {
            if(flight._deleted) { // Delete existing
                return AppActions.deleteFlight(flight.uuid as string, authHeaders(token))
            }

            if(flight.uuid) { // Update existing
                return AppActions.updateFlight(flight, authHeaders(token))
            } else { // Create new
                return AppActions.createFlight({ ...flight, parentId: formData.uuid as string }, authHeaders(token))
            }
        })
    )

    const batteries = formData.Vehicle?.Batteries?.filter(battery => (battery._dirtied && battery.batteryName) || battery._deleted) || []

    await Promise.all(
        batteries.map(battery => {
            if(battery._deleted) { // Delete existing
                return AppActions.deleteBattery(battery.uuid as string, authHeaders(token))
            }

            if(battery.uuid) { // Update existing
                return AppActions.updateBattery(battery, authHeaders(token))
            } else { // Create new
                return AppActions.createBattery({ ...battery, parentId: formData.Vehicle?.uuid as string }, authHeaders(token))
            }
        })
    )

    return { success: true, msg: 'Mission Updated' }
}