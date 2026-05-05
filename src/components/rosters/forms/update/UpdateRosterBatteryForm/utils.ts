import * as AppActions from '@/context/App/AppActions'
import { withTokenRefresh } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateBattery = async (
  formData: AppTypes.BatteryRosterCreateInterface,
  token: string,
  refreshToken: () => Promise<string | undefined>
) => {
  if(formData._dirtied) {
    const result = await withTokenRefresh(
      () => AppActions.updateRosterBattery(formData, authHeaders(token)),
      refreshToken
    )

    return result
  }

  return { success: true, msg: 'No changes to save' }
}