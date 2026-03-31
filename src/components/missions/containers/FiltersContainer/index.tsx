import { motion } from 'motion/react'
import { motionProps } from '../../tables/MissionsTable/utils'

// Components
import * as Components from './components'

function FiltersContainer({ visible }: { visible: boolean }) {
  if(!visible) return 

  return (
    <motion.div 
      className="flex flex-col gap-4 items-center mx-auto w-full md:flex-row md:gap-6 md:mr-auto md:mx-0 md:flex-1 md:items-end"
      { ...motionProps.slideInRight }>
        <Components.PersonnelFilter />
        <Components.Search />
        <Components.DateRangeFilterInputs />
    </motion.div>
  )
}

export default FiltersContainer