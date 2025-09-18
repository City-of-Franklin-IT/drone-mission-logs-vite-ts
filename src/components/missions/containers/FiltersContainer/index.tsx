import { motion } from 'motion/react'
import { motionProps } from '../../tables/MissionsTable/utils'

// Components
import * as Components from './components'

function FiltersContainer({ visible }: { visible: boolean }) {
  if(!visible) return 

  return (
    <motion.div 
      className="flex flex-col gap-4 items-end mx-auto w-fit lg:gap-6 lg:mr-auto lg:mx-0"
      { ...motionProps.slideInRight }>
        <div className="flex gap-4">
          <Components.PersonnelFilter />
          <Components.Search />
        </div>
        <Components.DateRangeFilterInputs />
    </motion.div>
  )
}

export default FiltersContainer