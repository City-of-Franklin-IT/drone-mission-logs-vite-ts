import { MissionsProvider } from "@/components/missions/context"
import { useGetMissions } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import MissionsContainer from "@/components/missions/containers/MissionsContainer"

function Missions() {
  const { data, isLoading } = useGetMissions()

  if(isLoading) return (
    <Loading />
  )

  return (
    <ErrorBoundary href={'/'}>
      <MissionsProvider>
        <MissionsContainer missions={data?.data ?? []} />
      </MissionsProvider>
    </ErrorBoundary>
  )
}

export default Missions