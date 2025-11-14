import { useQuery } from "react-query"
import { useWatch } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useHandleBatteryInput = (index: number) => {
  const { control, setValue, getValues } = useCreateMissionCtx()

  const { isLoading } = useGetBatteries()

  const values = getValues(`Vehicle.Batteries.${ index }`)

  const visible = !isLoading && !values?._deleted

  const removeBtnOnClick = () => {
    setValue(`Vehicle.Batteries.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })
  }

  const removeBtnProps = {
    onClick: removeBtnOnClick,
    visible: !!values?.batteryName
  }

  return { control, setValue, visible, removeBtnProps }
}

export const useHandleBatteryOptions = () => {
  const { control } = useCreateMissionCtx()
  
  const vehicle = useWatch({
    control,
    name: 'Vehicle.registration'
  })

  const { data } = useGetBatteries()

  const batteries = data?.data.filter(battery => battery.registration === vehicle) || []

  return batteries
}

const useGetBatteries = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getRosterBatteries', () => AppActions.getRosterBatteries(authHeaders(token)), { enabled: enabled && !!token })
}