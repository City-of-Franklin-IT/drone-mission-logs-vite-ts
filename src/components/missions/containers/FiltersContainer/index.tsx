import { motion } from 'motion/react'
import { motionProps } from '../../tables/MissionsTable/utils'

// Components
import * as Components from './components'

function FiltersContainer({ visible }: { visible: boolean }) {
  if(!visible) return 

  return (
    <motion.div 
      className="flex flex-col gap-4 items-end mx-auto w-full lg:flex-row lg:gap-6 lg:mr-auto lg:mx-0 lg:w-fit"
      { ...motionProps.slideInRight }>
        <Components.PersonnelFilter />
        <Components.Search />
        <Components.DateRangeFilterInputs />
    </motion.div>
  )
}

export default FiltersContainer