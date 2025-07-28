// Types
import * as AppTypes from '@/context/App/types'

// Components
import MissionsTable from '../../tables/MissionsTable'
import FiltersContainer from '../FiltersContainer'
import PaginationContainer from '../PaginationContainer'
import * as Components from './components'

function MissionsContainer({ missions }: { missions: AppTypes.MissionInterface[] }) {

  return (
    <div className="flex flex-col gap-20 items-center mx-auto my-20 w-9/10 xl:w-4/5 xl:mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-end gap-10 justify-center flex-wrap">
          <FiltersContainer />
          <PaginationContainer />
        </div>
        <MissionsTable missions={missions} />
      </div>
      <Components.Form />
    </div>
  )
}

export default MissionsContainer
