import { useCreateMissionCtx } from "../CreateMissionForm/hooks"

export const useHandleTFRInputs = () => {
  const { getValues, setValue } = useCreateMissionCtx()

  const values = getValues('TemporaryFlightRestriction')

  const visible = !values?._deleted

  const onRemoveBtnClick = () => {
    setValue('TemporaryFlightRestriction._deleted', true, { shouldDirty: true, shouldValidate: true })
  }

  const removeBtnProps = {
    onClick: onRemoveBtnClick,
    visible: !!values
  }

  return { visible, removeBtnProps }
}

export const useHandleAddTFRBtn = () => {
  const { setValue, getValues } = useCreateMissionCtx()

  const onClick = () => {
    setValue('TemporaryFlightRestriction.temporaryFlightRestriction', ''),
    setValue('TemporaryFlightRestriction.source', '')
  }

  const visible = !!getValues('TemporaryFlightRestriction') ?
    false :
    true

  return { onClick, visible }
}

export const useHandleTFR = () => {
  const methods = useCreateMissionCtx()

  const visible = !!methods.watch('TemporaryFlightRestriction')

  return { methods, visible }
}