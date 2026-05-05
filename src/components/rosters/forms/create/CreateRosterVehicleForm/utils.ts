import { withTokenRefresh } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateRosterVehicle = async (
  formData: AppTypes.VehicleRosterCreateInterface,
  token: string,
  refreshToken: () => Promise<string | undefined>
) => {
  const result = await withTokenRefresh(
    () => AppActions.createRosterVehicle(formData, authHeaders(token)),
    refreshToken
  )

  return result
}