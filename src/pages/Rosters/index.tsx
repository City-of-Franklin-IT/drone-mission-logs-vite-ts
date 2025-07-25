import { useGetRosters } from './hooks'
import { RostersProvider } from '@/components/rosters/context'

// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import HandleLoading from '@/utils/HandleLoading'
import RostersContainer from "@/components/rosters/containers/RostersContainer"

function Rosters() {
  const { personnel, vehicles, batteries, isSuccess } = useGetRosters()

  return (
    <Layout>
      <ErrorBoundary href={'/missions'}>
        <HandleLoading isSuccess={isSuccess}>
          <RostersProvider>
            <RostersContainer
              personnel={personnel}
              vehicles={vehicles}
              batteries={batteries} />
          </RostersProvider>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Rosters