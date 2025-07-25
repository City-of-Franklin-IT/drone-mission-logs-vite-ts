// Types
import * as AppTypes from '@/context/App/types'

// Components
import MissionsTable from '../../tables/MissionsTable'
import FiltersContainer from '../FiltersContainer'
import * as Components from './components'

function MissionsContainer({ missions }: { missions: AppTypes.MissionInterface[] }) {

  return (
    <div className="flex flex-col gap-20 items-center my-20 w-full xl:w-4/5 xl:mx-auto">
      <div className="flex flex-col gap-10 w-full">
        <FiltersContainer />
        <MissionsTable missions={missions} />
      </div>
      <Components.Form />
    </div>
  )
}

export default MissionsContainer
