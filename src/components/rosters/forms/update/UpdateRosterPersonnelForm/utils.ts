import { withTokenRefresh } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdatePersonnel = async (
  formData: AppTypes.PersonnelRosterCreateInterface,
  token: string,
  refreshToken: () => Promise<string | undefined>
) => {
  const result = await withTokenRefresh(
    () => AppActions.updateRosterPersonnel(formData, authHeaders(token)),
    refreshToken
  )

  return result
}