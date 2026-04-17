import { RostersProvider } from '@/components/rosters/context'
import { useGetRosters } from './hooks'


// Components
import ErrorBoundary from "@/components/error/ErrorBoundary"
import HandleLoading from '@/utils/HandleLoading'
import RostersContainer from "@/components/rosters/containers/RostersContainer"

function Rosters() {

  const { personnel, vehicles, batteries, isSuccess } = useGetRosters()

  return (
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
  )
}

export default Rosters