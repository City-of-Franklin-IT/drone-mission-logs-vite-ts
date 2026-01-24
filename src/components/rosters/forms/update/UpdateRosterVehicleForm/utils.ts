import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateVehicle = async (formData: AppTypes.VehicleRosterCreateInterface, token: string) => {
  if(formData._dirtied) {
    const result = await AppActions.updateRosterVehicle(formData, authHeaders(token))

    return result
  }

  return { success: true, msg: 'No changes to save' }
}