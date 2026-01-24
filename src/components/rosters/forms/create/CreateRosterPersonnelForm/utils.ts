import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, token: string) => {
  const result = await AppActions.createRosterPersonnel(formData, authHeaders(token))

  return result
}