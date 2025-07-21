// Components
import CreateMissionForm from "@/components/missions/forms/create/CreateMissionForm"

export const createFormMap = new Map<string, () => JSX.Element>([
  ['mission', CreateMissionForm]
])