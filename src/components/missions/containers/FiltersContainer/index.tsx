import { motion } from 'motion/react'
import { motionProps } from '../../tables/MissionsTable/utils'

// Components
import * as Components from './components'

function FiltersContainer({ visible }: { visible: boolean }) {
  if(!visible) return null

  return (
    <motion.div
      className="card rounded-box w-full mx-auto p-6 shadow-xl md:mr-auto md:mx-0 md:flex-1"
      { ...motionProps.slideInRight }>
        <div className="flex flex-col gap-4 items-center md:flex-row md:gap-6 md:items-end">
          <Components.PersonnelFilter />
          <Components.Search />
          <Components.DateRangeFilterInputs />
          <Components.ClearAllFiltersBtn />
        </div>
    </motion.div>
  )
}

export default FiltersContainer