import { MissionsProvider } from "@/components/missions/context"
import { useGetMissions } from "./hooks"

// Components
import Layout from "@/components/layout/Layout"
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import MissionsContainer from "@/components/missions/containers/MissionsContainer"

function Missions() {
  const { data, isSuccess } = useGetMissions()

  return (
    <Layout>
      <ErrorBoundary href={'/'}>
        <HandleLoading isSuccess={isSuccess}>
          <MissionsProvider>
            <MissionsContainer missions={data?.data || []} />
          </MissionsProvider>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Missions