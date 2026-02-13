import { useGetVehicle, useHandleForm } from './hooks'

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as PersonnelContainer from '../../containers/PersonnelContainer/components'
import CreateRosterVehicleForm from '../../forms/create/CreateRosterVehicleForm'
import UpdateRosterVehicleForm from '../../forms/update/UpdateRosterVehicleForm'

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => {
  const { formUUID, deleteBtnProps, visible } = useHandleForm()

  if(!visible) return null

  if(!formUUID) return ( // Create new
    <div ref={formRef} className="w-full">
      <CreateRosterVehicleForm />
    </div>
  )

  return ( // Update existing
    <div ref={formRef} className="flex flex-col gap-4 w-full">
      <GetVehicle />
      <PersonnelContainer.DeleteBtn 
        onClick={deleteBtnProps.onClick}
        size={'btn-sm'}>
          {deleteBtnProps.label}
      </PersonnelContainer.DeleteBtn>
    </div>
  )
}

const GetVehicle = () => {
  const { data, isSuccess } = useGetVehicle()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <UpdateRosterVehicleForm vehicle={data?.data} />
    </HandleLoading>
  )
}