import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from 'react-query'
import { useForm, useFormContext } from 'react-hook-form'
import { useEnableQuery } from '@/helpers/hooks'
import { handleCreateMission } from './utils'
import { errorPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateMissionForm = () => {
  
  return useForm<AppTypes.MissionCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      missionDate: '',
      incidentNumber: '',
      missionDescription: '',
      location: '',
      Vehicle: {
        registration: '',
        Batteries: [{
          batteryName: ''
        },{
          batteryName: ''
        }]
      },
      Personnel: [{
        email: '',
        isPilot: true
      },{
        email: '',
        isPilot: false
      }],
      Flights: [{
        takeOffDateTime: '',
        landingDateTime: ''
      }],
      Inspection: {
        preFlight: null,
        postFlight: null
      },
      Weather: {
        temperature: undefined,
        visibility: undefined,
        wind: undefined,
        source: ''
      },
      TemporaryFlightRestriction: undefined
    }
  })
}

export const useCreateMissionCtx = () => {
  
  return useFormContext<AppTypes.MissionCreateInterface>()
}

export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/missions')
}

export const useHandleFormSubmit = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.MissionCreateInterface) => {
    if(!enabled || !token) return

    handleCreateMission(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getMissions')
        navigate('/missions')
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, navigate, queryClient])
}