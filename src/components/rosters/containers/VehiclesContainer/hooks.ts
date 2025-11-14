import { useContext, useState, useRef } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { useEnableQuery } from "@/helpers/hooks"
import { useOnCreateBtnClick } from "../PersonnelContainer/hooks"
import RostersCtx from "../../context"

export const useHandleVehiclesContainer = () => {
  const onCreateBtnClick = useOnCreateBtnClick('vehicle')

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  return { refs: { topRef, formRef }, onCreateBtnClick }
}

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

  const visible = formType === 'vehicle'

  const deleteBtnProps = {
    onClick: onDeleteBtnClick,
    label: deleteBtnLabel
  }

  return { formUUID, deleteBtnProps, visible }
}