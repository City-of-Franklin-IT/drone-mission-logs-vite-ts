// Types
import * as AppTypes from '@/context/App/types'

// Components
import MissionsTable from '../../tables/MissionsTable'
import FiltersContainer from '../FiltersContainer'
import * as Components from './components'

function MissionsContainer({ missions }: { missions: AppTypes.MissionInterface[] }) {

  return (
    <div className="flex flex-col gap-20 items-center mx-auto my-20 w-9/10">
      <div className="flex gap-6 items-center flex-wrap">
        <FiltersContainer visible={!!missions.length} />
        <MissionsTable missions={missions} />
      </div>
      <Components.Form />
    </div>
  )
}

export default MissionsContainer
