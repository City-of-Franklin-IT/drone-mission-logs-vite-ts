import { useContext } from 'react'
import RostersCtx from '../../context'
import { useOnCreateBtnClick } from '../PersonnelContainer/hooks'
import { useGetBattery, useHandleForm } from './hooks'

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as PersonnelContainer from '../../containers/PersonnelContainer/components'
import CreateRosterBatteryForm from '../../forms/create/CreateRosterBatteryForm'
import UpdateRosterBatteryForm from '../../forms/update/UpdateRosterBatteryForm'

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => {
  const { formUUID, formType, onDeleteBtnClick, deleteBtnLabel } = useHandleForm()

  if(formType !== 'battery') return

  if(!formUUID) return ( // Create new
    <div ref={formRef}>
      <CreateRosterBatteryForm />
    </div>
  )

  return ( // Update existing
    <div ref={formRef} className="flex flex-col gap-4 w-full">
      <GetBattery />
      <PersonnelContainer.DeleteBtn 
        onClick={onDeleteBtnClick}
        size={'btn-sm'}>
          {deleteBtnLabel}
      </PersonnelContainer.DeleteBtn>
    </div>
  )
}

export const CreateBtn = () => {
  const { batteryRosterFilter } = useContext(RostersCtx)

  const onCreateBtnClick = useOnCreateBtnClick('battery')

  if(!batteryRosterFilter) return

  return (
    <PersonnelContainer.CreateBtn onClick={onCreateBtnClick}>
      Add Battery
    </PersonnelContainer.CreateBtn>
  )
}

const GetBattery = () => {
  const { data, isSuccess } = useGetBattery()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <UpdateRosterBatteryForm battery={data?.data} />
    </HandleLoading>
  )
}