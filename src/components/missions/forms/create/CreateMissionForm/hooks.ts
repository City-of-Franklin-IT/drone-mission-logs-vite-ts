import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, useFormContext, useFieldArray } from 'react-hook-form'
import { useEnableQuery } from '@/helpers/hooks'
import { handleCreateMission } from './utils'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleCreateMissionForm = () => {
  const methods = useCreateMissionForm()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

export const useCreateMissionCtx = () => {
  
  return useFormContext<AppTypes.MissionCreateInterface>()
}

export const useHandleBatteryInputs = () => {
  const { watch } = useCreateMissionCtx()

  const vehicle = watch('Vehicle.registration')

  const batteries = watch('Vehicle.Batteries') || []

  const visible = !!vehicle

  return { visible, batteries }
}

export const useHandleAddBatteryBtn = () => {
  const { control } = useCreateMissionCtx()
  
  const { append } = useFieldArray({
    control,
    name: 'Vehicle.Batteries'
  })

  const onClick = () => {
    append({ batteryName: '', parentId: '' })
  }

  return onClick
}

export const useHandleAddFlightBtn = () => {
  const { control } = useCreateMissionCtx()

  const { append } = useFieldArray({
    control,
    name: 'Flights'
  })

  const onClick = () => {
    append({ takeOffDateTime: '', landingDateTime: '', parentId: '' })
  }

  return onClick
}

export const useHandleResponseOnly = () => {
  const { watch } = useCreateMissionCtx()

  const isResponseOnly = watch('ResponseOnly._checked')

  const visible = !isResponseOnly

  return visible
}

const useCreateMissionForm = () => {
  const department = window.location.hostname === 'pdapps.franklintn.gov' ?
    'Police' :
    'Fire'

  const form = useForm<AppTypes.MissionCreateInterface>({
    mode: 'onChange',
    defaultValues: {
      missionDate: '',
      department: undefined,
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
      TemporaryFlightRestriction: undefined,
      ResponseOnly: {
        _checked: false,
        parentId: ''
      }
    }
  })

  useEffect(() => {
    if(department) {
      form.setValue('department', department)
    }
  }, [department, form])

  return form
}

const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/missions')
}

const useHandleFormSubmit = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.MissionCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateMission(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else {
      savedPopup(result.msg)
      queryClient.invalidateQueries({ queryKey: ['getMissions'] })
      queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
      queryClient.invalidateQueries({ queryKey: ['getRosterVehicles'] })
      queryClient.invalidateQueries({ queryKey: ['getRosterBatteries'] })
      navigate('/missions')
    }
  }
}