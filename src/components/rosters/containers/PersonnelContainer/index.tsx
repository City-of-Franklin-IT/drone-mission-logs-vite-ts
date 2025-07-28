import { useRef } from 'react'
import { useOnCreateBtnClick, useScrollToFormRef } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PersonnelTable from '../../tables/PersonnelTable'
import * as Components from './components'

function PersonnelContainer({ personnel }: { personnel: AppTypes.PersonnelRosterInterface[] }) {
  const onCreateBtnClick = useOnCreateBtnClick('personnel')

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ topRef, formRef }, 'personnel')

  return (
    <div ref={topRef} className="flex flex-col gap-4 items-center p-6 rounded-xl bg-neutral/10 xl:p-10">
      <div className="flex flex-col gap-4 items-center">
        <Components.Header>Personnel</Components.Header>

        <PersonnelTable personnel={personnel} />
        <Components.CreateBtn onClick={onCreateBtnClick}>
          Add Personnel
        </Components.CreateBtn>
      </div>
      <Components.Form formRef={formRef} />
    </div>
  )
}

export default PersonnelContainer