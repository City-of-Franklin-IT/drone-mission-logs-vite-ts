import { useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import MissionsCtx from "@/components/missions/context"
import { useEnableQuery } from "@/helpers/hooks"
import { utcToLocalDatetime, handleUpdateMission } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

export const useUpdateMissionForm = (mission: AppTypes.MissionInterface | undefined) => {
  const flights = mission?.Flights?.map(flight => {
    return ({ ...flight, takeOffDateTime: utcToLocalDatetime(flight.takeOffDateTime), landingDateTime: utcToLocalDatetime(flight.landingDateTime) })
  })

  return useForm<AppTypes.MissionCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...mission,
      Flights: flights
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(MissionsCtx)

  return () => {
    dispatch({ type: 'RESET_CTX' })
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }
}

export const useHandleDeleteBtn = () => {
  const { missionUUID, dispatch } = useContext(MissionsCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteMission(missionUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getMissions')
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onClick, label: !state.active ? 'Delete Mission' : 'Confirm Delete' }
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(MissionsCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.MissionCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateMission(formData, token)
      .then(() => {
        savedPopup('Mission Updated')
        queryClient.invalidateQueries('getMissions')
        queryClient.invalidateQueries(['getMission', formData.uuid])
        window.scrollTo({ behavior: 'smooth', top: 0 })
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, dispatch, queryClient])
}