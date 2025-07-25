import { useContext } from "react"
import MissionsCtx from "../../context"
import { useGetPersonnel } from "../../forms/create/CreatePersonnelForm/hooks"

// Components
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-neutral-content uppercase font-bold">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play]">
        <DateRangeStartInput />
        <DateRangeEndInput />
      </div>
    </div>
  )
}

export const PersonnelFilter = () => {
  const { dispatch } = useContext(MissionsCtx)

  const { isLoading } = useGetPersonnel()

  if(isLoading) return

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-neutral-content uppercase font-bold">Personnel Filter</span>
      <select
        className="select hover:cursor-pointer"
        onChange={(e) => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: e.currentTarget.value })}>
          <CreatePersonnelForm.PersonnelOptions />
      </select>
    </div>
  )
}

const DateRangeStartInput = () => {
  const { dispatch } = useContext(MissionsCtx)

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">Start:</label>
      <input 
        type="date"
        className="input hover:cursor-pointer" 
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: e.currentTarget.value })}/>
    </div>
  )
}

const DateRangeEndInput = () => {
  const { dispatch } = useContext(MissionsCtx)

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">End:</label>
      <input 
        type="date"
        className="input hover:cursor-pointer" 
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: e.currentTarget.value })}/>
    </div>
  )
}