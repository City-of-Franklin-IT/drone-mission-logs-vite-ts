import { useSetTableData } from './hooks'

// Types
import type * as AppTypes from '@/context/App/types'

// Components
import MissionsTable from '../../tables/MissionsTable'
import FiltersContainer from '../FiltersContainer'
import PaginationContainer from '../PaginationContainer'
import * as Components from './components'

function MissionsContainer({ missions }: { missions: AppTypes.MissionInterface[] }) {
  const { tableData, filteredCount } = useSetTableData(missions)

  return (
    <div className="flex flex-col gap-10 items-center my-10 p-3 lg:p-10 lg:my-20">
      <div className="flex gap-6 flex-wrap items-center lg:items-end w-full">
        <FiltersContainer visible={!!missions.length} />
        <PaginationContainer count={filteredCount} />
        <div className="overflow-x-auto w-full">
          <MissionsTable tableData={tableData} />
        </div>
      </div>
      <Components.Form />
    </div>
  )
}

export default MissionsContainer
