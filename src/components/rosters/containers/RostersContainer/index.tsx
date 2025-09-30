import { memo } from 'react'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PersonnelContainer from '../PersonnelContainer'
import VehiclesContainer from '../VehiclesContainer'
import BatteriesContainer from '../BatteriesContainer'

type RostersContainerProps = { personnel: AppTypes.PersonnelRosterInterface[], vehicles: AppTypes.VehicleRosterInterface[], batteries: AppTypes.BatteryRosterInterface[] }

const RostersContainer = memo((props: RostersContainerProps) => {

  return (
    <div className="flex gap-20 my-20 items-start justify-center w-full flex-wrap 2xl:w-4/5 xl:mx-auto">
      <PersonnelContainer personnel={props.personnel} />
      <div className="flex flex-col gap-10">
        <VehiclesContainer vehicles={props.vehicles} />
        <BatteriesContainer batteries={props.batteries} />
      </div>
    </div>
  )
})

export default RostersContainer