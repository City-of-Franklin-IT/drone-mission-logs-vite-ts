import { FieldPath } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export const useOnCurrentDateTimeBtnClick = () => {
  const { setValue } = useCreateMissionCtx()

  const cb = (field: FieldPath<AppTypes.MissionCreateInterface>) => {
    const now = new Date()
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)

    setValue(field, localDateTime, { shouldDirty: true, shouldValidate: true })
  }

  return cb
}

export const useHandleFlightInputs = (index: number) => {
  const { getValues, setValue } = useCreateMissionCtx()

  const values = getValues(`Flights.${ index }`)

  const visible = !values?._deleted

  const onRemoveBtnClick = () => {
    setValue(`Flights.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })
  }

  const removeBtnProps = {
    onClick: onRemoveBtnClick,
    visible: !!values.takeOffDateTime || !!values.landingDateTime
  }

  return { visible, removeBtnProps }
}

export const useHandleTakeOffInput = (index: number) => {
  const { control, watch, setValue } = useCreateMissionCtx()

  const onCurrentDateTimeBtnClick = useOnCurrentDateTimeBtnClick()

  const landingDateTime = watch(`Flights.${ index }.landingDateTime`)

  return { control, setValue, onCurrentDateTimeBtnClick, landingDateTime }
}

export const useHandleLandingInput = (index: number) => {
  const { control, watch, setValue } = useCreateMissionCtx()

  const onCurrentDateTimeBtnClick = useOnCurrentDateTimeBtnClick()

  const takeOffDateTime = watch(`Flights.${ index }.takeOffDateTime`)

  return { control, setValue, onCurrentDateTimeBtnClick, takeOffDateTime }
}