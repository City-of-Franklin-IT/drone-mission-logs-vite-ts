import { useRef } from 'react'
import { useScrollToFormRef } from '../PersonnelContainer/hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import BatteriesTable from '../../tables/BatteriesTable'
import * as PersonnelContainer from '../PersonnelContainer/components'
import * as Components from './components'

function BatteriesContainer({ batteries }: { batteries: AppTypes.BatteryRosterInterface[] }) {

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ topRef, formRef }, 'battery')

  return (
    <div ref={topRef} className="flex flex-col gap-4 items-center p-10 mx-auto rounded-xl bg-neutral/10 w-fit">
      <div className="flex flex-col gap-4 items-center">
        <PersonnelContainer.Header>Batteries</PersonnelContainer.Header>

        <BatteriesTable batteries={batteries} />
        <Components.CreateBtn />
      </div>
      <Components.Form formRef={formRef} />
    </div>
  )
}

export default BatteriesContainer