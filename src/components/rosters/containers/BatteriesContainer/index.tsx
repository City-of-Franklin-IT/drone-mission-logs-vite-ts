import { memo, useRef } from 'react'
import { motion } from 'motion/react'
import { motionProps } from '@/components/missions/tables/MissionsTable/utils'
import { useScrollToFormRef } from '../PersonnelContainer/hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import BatteriesTable from '../../tables/BatteriesTable'
import * as PersonnelContainer from '../PersonnelContainer/components'
import * as Components from './components'

const BatteriesContainer = memo(({ batteries }: { batteries: AppTypes.BatteryRosterInterface[] }) => {

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ topRef, formRef }, 'battery')

  return (
    <motion.div 
      ref={topRef} 
      className="flex flex-col gap-4 items-center p-10 mx-auto rounded-xl bg-neutral/10 w-fit"
      { ...motionProps.slideInRight }>
        <div className="flex flex-col gap-4 items-center">
          <PersonnelContainer.Header>Batteries</PersonnelContainer.Header>

          <BatteriesTable batteries={batteries} />
          <Components.CreateBtn />
        </div>
        <Components.Form formRef={formRef} />
    </motion.div>
  )
})

export default BatteriesContainer