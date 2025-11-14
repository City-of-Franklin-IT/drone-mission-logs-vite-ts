// Types
import * as AppTypes from '@/context/App/types'

// Components
import MissionsTable from '../../tables/MissionsTable'
import PaginationContainer from '../PaginationContainer'
import FiltersContainer from '../FiltersContainer'
import * as Components from './components'

function MissionsContainer({ missions }: { missions: AppTypes.MissionInterface[] }) {

  return (
    <div className="flex flex-col gap-10 items-center my-20 p-3 lg:p-10">
      <div className="flex gap-6 flex-wrap items-center lg:items-end w-full">
        <FiltersContainer visible={!!missions.length} />
        <PaginationContainer />
      </div>
      <div className="overflow-x-auto w-full">
        <MissionsTable missions={missions} />
      </div>
      <Components.Form />
    </div>
  )
}

export default MissionsContainer
