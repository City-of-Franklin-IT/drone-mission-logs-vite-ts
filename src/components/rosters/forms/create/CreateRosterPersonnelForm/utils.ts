import { withTokenRefresh } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateRosterPersonnel = async (
  formData: AppTypes.PersonnelRosterCreateInterface,
  token: string,
  refreshToken: () => Promise<string | undefined>
) => {
  const result = await withTokenRefresh(
    () => AppActions.createRosterPersonnel(formData, authHeaders(token)),
    refreshToken
  )

  return result
}