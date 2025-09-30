import { useContext } from "react"
import MissionsCtx from "../../context"
import { useGetPersonnel } from "../../forms/create/CreatePersonnelForm/hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(MissionsCtx)

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play] px-2 justify-center flex-wrap">
        <DateRangeInput onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: e.currentTarget.value })}>
          Start:
        </DateRangeInput>
        <DateRangeInput onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: e.currentTarget.value })}>
          End:
        </DateRangeInput>
      </div>
      <ClearFilterBtn
        onClick={() => {
          dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '' })
          dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '' })
        }}
        disabled={!dateRangeFilter.start || !dateRangeFilter.end} />
    </div>
  )
}

export const PersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(MissionsCtx)

  const { isSuccess } = useGetPersonnel()

  if(!isSuccess) return <Loading />

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 shadow-xl w-full">
      <span className="text-neutral-content uppercase font-bold">Personnel Filter</span>

      <select
        data-testid="personnel-select"
        className="select mx-auto w-[90%] hover:cursor-pointer"
        value={personnelFilter}
        onChange={(e) => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: e.currentTarget.value })}>
          <CreatePersonnelForm.PersonnelOptions />
      </select>
      <ClearFilterBtn
        onClick={() => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: '' })}
        disabled={!personnelFilter} />
    </div>
  )
}

export const Search = () => {
  const { searchValue, dispatch } = useContext(MissionsCtx)

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Search</span>

      <input
        data-testid="search-input" 
        type="text"
        className="input"
        placeholder="by mission description.."
        value={searchValue}
        onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} />
      <ClearFilterBtn
        onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
        disabled={!searchValue} />
    </div>
  )
}

type DateRangeInputProps = { onChange: React.ChangeEventHandler<HTMLInputElement>, children: React.ReactNode }

const DateRangeInput = (props: DateRangeInputProps) => {

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">{props.children}</label>
      <input
        type="date"
        className="input hover:cursor-pointer" 
        onChange={props.onChange}/>
    </div>
  )
}

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

const ClearFilterBtn = (props: ClearFilterBtnProps) => {

  return (
    <button
      data-testid="clear-filter-btn" 
      type="button"
      className="btn btn-secondary btn-sm font-[play] uppercase w-full"
      disabled={props.disabled}
      onClick={props.onClick}>
        Clear
    </button>
  )
}