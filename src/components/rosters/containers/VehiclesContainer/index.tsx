import { memo, useRef } from 'react'
import { motion } from 'motion/react'
import { motionProps } from '@/components/missions/tables/MissionsTable/utils'
import { useOnCreateBtnClick, useScrollToFormRef } from '../PersonnelContainer/hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import VehiclesTable from '../../tables/VehiclesTable'
import * as PersonnelContainer from '../PersonnelContainer/components'
import * as Components from './components'

const VehiclesContainer = memo(({ vehicles }: { vehicles: AppTypes.VehicleRosterInterface[] }) => {
  const onCreateBtnClick = useOnCreateBtnClick('vehicle')

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ topRef, formRef }, 'vehicle')

  return (
    <motion.div 
      ref={topRef} 
      className="flex flex-col gap-4 items-center p-6 rounded-xl bg-neutral/10 xl:p-10"
      { ...motionProps.slideInRight }>
        <div className="flex flex-col gap-4 items-center">
          <PersonnelContainer.Header>Vehicles</PersonnelContainer.Header>

          <VehiclesTable vehicles={vehicles} />
          <PersonnelContainer.CreateBtn onClick={onCreateBtnClick}>
            Add Vehicle
          </PersonnelContainer.CreateBtn>
        </div>
        <Components.Form formRef={formRef} />
    </motion.div>
  )
})

export default VehiclesContainer