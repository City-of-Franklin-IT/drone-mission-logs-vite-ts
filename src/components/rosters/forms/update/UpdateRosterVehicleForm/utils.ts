import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { savedPopup, errorPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateVehicle = async (formData: AppTypes.VehicleRosterCreateInterface, token: string) => {
  if(formData._dirtied) {
    const result = await AppActions.updateRosterVehicle(formData, authHeaders(token))

    if(result.success) {
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }
}