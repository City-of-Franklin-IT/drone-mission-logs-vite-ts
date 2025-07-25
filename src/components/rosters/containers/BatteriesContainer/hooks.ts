import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "../../context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

export const useGetBattery = () => {
  const { formUUID } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getBattery', formUUID], () => AppActions.getBattery(formUUID, authHeaders(token)), { enabled: enabled && !!token })
}

export const useHandleDeleteBtn = () => {
  const { formUUID, dispatch } = useContext(RostersCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteRosterBattery(formUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getRosterBatteries')
      queryClient.invalidateQueries(['getBattery', formUUID])
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onClick, label: !state.active ? 'Delete Battery' : 'Confirm Delete' }
}