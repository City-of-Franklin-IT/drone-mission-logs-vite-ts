import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "../../context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

export const useGetVehicle = () => {
  const { formUUID } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getVehicle', formUUID], () => AppActions.getVehicle(formUUID, authHeaders(token)), { enabled: enabled && !!token })
}

export const useHandleForm = () => {
  const { formUUID, formType, dispatch } = useContext(RostersCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onDeleteBtnClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteRosterVehicle(formUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getRosterVehicles')
      queryClient.invalidateQueries(['getVehicle', formUUID])
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  const deleteBtnLabel = !state.active ? 'Delete Vehicle' : 'Confirm Delete'

  return { formUUID, formType, onDeleteBtnClick, deleteBtnLabel }
}