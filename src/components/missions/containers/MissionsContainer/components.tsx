import { useContext, useRef } from "react"
import MissionsCtx from "../../context"
import { useGetMission, useScrollToRef } from './hooks'

// Components
import FormContainer from "@/components/form-elements/FormContainer"
import HandleLoading from "@/utils/HandleLoading"
import UpdateMissionForm from "../../forms/update/UpdateMissionForm"

export const Form = () => {
  const { missionUUID } = useContext(MissionsCtx)

  const ref = useRef<HTMLDivElement>(null)

  useScrollToRef(ref)

  if(!missionUUID) return

  return (
    <div ref={ref}>
      <GetMission />
    </div>
  )
}

const GetMission = () => {
  const { data, isSuccess } = useGetMission()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <FormContainer>
        <UpdateMissionForm mission={data?.data} />
      </FormContainer>
    </HandleLoading>
  )
}