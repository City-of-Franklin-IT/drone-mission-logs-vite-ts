import { useGetBattery, useHandleForm, useHandleCreateBtn } from './hooks'

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as PersonnelContainer from '../../containers/PersonnelContainer/components'
import CreateRosterBatteryForm from '../../forms/create/CreateRosterBatteryForm'
import UpdateRosterBatteryForm from '../../forms/update/UpdateRosterBatteryForm'

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => {
  const { formUUID, deleteBtnProps, visible } = useHandleForm()

  if(!visible) return

  if(!formUUID) return ( // Create new
    <div ref={formRef}>
      <CreateRosterBatteryForm />
    </div>
  )

  return ( // Delete existing
    <div ref={formRef} className="flex flex-col gap-4 w-full">
      <GetBattery />
      <PersonnelContainer.DeleteBtn 
        onClick={deleteBtnProps.onClick}
        size={'btn-sm'}>
          {deleteBtnProps.label}
      </PersonnelContainer.DeleteBtn>
    </div>
  )
}

export const CreateBtn = () => {
  const { visible, onClick } = useHandleCreateBtn()

  if(!visible) return

  return (
    <PersonnelContainer.CreateBtn onClick={onClick}>
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