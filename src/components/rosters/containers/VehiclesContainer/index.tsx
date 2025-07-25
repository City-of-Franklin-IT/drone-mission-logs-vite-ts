import { useRef } from 'react'
import { useOnCreateBtnClick, useScrollToFormRef } from '../PersonnelContainer/hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import VehiclesTable from '../../tables/VehiclesTable'
import * as PersonnelContainer from '../PersonnelContainer/components'
import * as Components from './components'

function VehiclesContainer({ vehicles }: { vehicles: AppTypes.VehicleRosterInterface[] }) {
  const onCreateBtnClick = useOnCreateBtnClick('vehicle')

  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ topRef, formRef }, 'vehicle')

  return (
    <div ref={topRef} className="flex flex-col gap-4 items-center p-10 rounded-xl bg-neutral/10">
      <div className="flex flex-col gap-4 items-center">
        <PersonnelContainer.Header>Vehicles</PersonnelContainer.Header>

        <VehiclesTable vehicles={vehicles} />
        <PersonnelContainer.CreateBtn onClick={onCreateBtnClick}>
          Add Vehicle
        </PersonnelContainer.CreateBtn>
      </div>
      <Components.Form formRef={formRef} />
    </div>
  )
}

export default VehiclesContainer