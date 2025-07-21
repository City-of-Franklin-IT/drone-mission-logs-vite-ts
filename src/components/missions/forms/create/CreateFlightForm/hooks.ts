import { useCallback } from "react"
import { FieldPath } from "react-hook-form"
import { useCreateMissionCtx } from "../CreateMissionForm/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export const useOnCurrentDateTimeBtnClick = () => {
  const { setValue } = useCreateMissionCtx()

  return useCallback((field: FieldPath<AppTypes.MissionCreateInterface>) => {
    const now = new Date()
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)

    setValue(field, localDateTime, { shouldDirty: true, shouldValidate: true })
  }, [setValue])
}