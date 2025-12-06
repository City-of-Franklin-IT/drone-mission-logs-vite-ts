import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { useOnCreateBtnClick } from "../PersonnelContainer/hooks"
import RostersCtx from "../../context"

export const useGetBattery = () => {
  const { formUUID } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({ 
    queryKey: ['getBattery', formUUID], 
    queryFn: () => AppActions.getBattery(formUUID, authHeaders(token)), 
    enabled: enabled && !!token 
  })
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

    const result = await AppActions.deleteRosterBattery(formUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries({ queryKey: ['getRosterBatteries'] })
      queryClient.invalidateQueries({ queryKey: ['getBattery', formUUID] })
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  const visible = formType === 'battery'

  const deleteBtnProps = {
    onClick: onDeleteBtnClick,
    label: !state.active ? 'Delete Battery' : 'Confirm Delete'
  }

  return { formUUID, deleteBtnProps, visible }
}

export const useHandleCreateBtn = () => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  const onClick = useOnCreateBtnClick('battery')

  const visible = !!batteryRosterFilter

  return { onClick, visible }
}