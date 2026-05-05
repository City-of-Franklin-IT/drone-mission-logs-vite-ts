import * as AppActions from '@/context/App/AppActions'
import { withTokenRefresh } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateRosterBattery = async (
  formData: AppTypes.BatteryRosterCreateInterface,
  token: string,
  refreshToken: () => Promise<string | undefined>
) => {
  const result = await withTokenRefresh(
    () => AppActions.createRosterBattery(formData, authHeaders(token)),
    refreshToken
  )

  return result
}