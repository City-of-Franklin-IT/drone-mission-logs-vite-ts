import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { savedPopup, errorPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateRosterBattery = async (formData: AppTypes.BatteryRosterCreateInterface, token: string) => {
  const result = await AppActions.createRosterBattery(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}