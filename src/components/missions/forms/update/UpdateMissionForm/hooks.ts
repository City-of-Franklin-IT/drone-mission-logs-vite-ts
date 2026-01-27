import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import MissionsCtx from "@/components/missions/context"
import { useEnableQuery } from "@/helpers/hooks"
import { utcToLocalDatetime, handleUpdateMission } from './utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns update mission form methods, cancel button onClick handler, delete button props, and update mission form submit function
**/
export const useHandleUpdateMissionForm = (mission: AppTypes.MissionInterface | undefined) => {
  const methods = useUpdateMissionForm(mission)
  const onCancelBtnClick = useOnCancelBtnClick()
  const deleteBtnProps = useHandleDeleteBtn()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, deleteBtnProps, handleFormSubmit } 
}

/**
* Returns update mission form methods
**/
const useUpdateMissionForm = (mission: AppTypes.MissionInterface | undefined) => {
  const flights = mission?.Flights?.map(flight => {
    return ({ ...flight, takeOffDateTime: utcToLocalDatetime(flight.takeOffDateTime), landingDateTime: utcToLocalDatetime(flight.landingDateTime) })
  })

  return useForm<AppTypes.MissionCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...mission,
      Flights: flights,
      ResponseOnly: {
        ...mission?.ResponseOnly,
        _checked: !!mission?.ResponseOnly
      }
    }
  })
}

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(MissionsCtx)

  return () => {
    dispatch({ type: 'RESET_CTX' })
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }
}

/**
* Returns delete button onClick handler and label; handles delete mission functionality
**/
const useHandleDeleteBtn = () => {
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
      queryClient.invalidateQueries({ queryKey: ['getMissions'] })
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onClick, label: !state.active ?
    'Delete Mission' :
    'Confirm Delete' }
}

/**
* Returns update mission form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(MissionsCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.MissionCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateMission(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getMissions'] })
      queryClient.invalidateQueries({ queryKey: ['getMission', formData.uuid] })
      window.scrollTo({ behavior: 'smooth', top: 0 })
      dispatch({ type: 'RESET_CTX' })
    }
  }
}