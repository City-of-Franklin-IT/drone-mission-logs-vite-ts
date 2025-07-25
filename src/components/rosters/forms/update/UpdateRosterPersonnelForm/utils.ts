import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

export const handleUpdatePersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, token: string) => {
  const result = await AppActions.updateRosterPersonnel(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}