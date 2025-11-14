import { memo } from 'react'
import { motion } from 'motion/react'
import { motionProps } from '@/components/missions/tables/MissionsTable/utils'
import { useHandlePersonnelContainer, useScrollToFormRef } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PersonnelTable from '../../tables/PersonnelTable'
import * as Components from './components'

const PersonnelContainer = memo(({ personnel }: { personnel: AppTypes.PersonnelRosterInterface[] }) => {
  const { refs, onCreateBtnClick } = useHandlePersonnelContainer()

  useScrollToFormRef({ ...refs }, 'personnel')

  return (
    <motion.div 
      ref={refs.topRef} 
      className="flex flex-col gap-4 items-center p-6 rounded-xl bg-neutral/10 xl:p-10"
      { ...motionProps.slideInLeft }>
        <div className="flex flex-col gap-4 items-center">
          <Components.Header>Personnel</Components.Header>

          <PersonnelTable personnel={personnel} />
          <Components.CreateBtn onClick={onCreateBtnClick}>
            Add Personnel
          </Components.CreateBtn>
        </div>
        <Components.Form formRef={refs.formRef} />
    </motion.div>
  )
})

export default PersonnelContainer