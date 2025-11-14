import { useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from './hooks'

// Components
import Loading from "@/components/layout/loading/Loading"
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { startInputProps, endInputProps, clearBtnProps } = useHandleDateRangeFilterInputs()

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Date Range Filter</span>
      <div className="flex flex-col items-center gap-4 font-[play] px-2 justify-center flex-wrap">
        <DateRangeInput inputProps={startInputProps}>
          Start:
        </DateRangeInput>
        <DateRangeInput inputProps={endInputProps}>
          End:
        </DateRangeInput>
      </div>
      <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

export const PersonnelFilter = () => {
  const { loading, selectProps, clearBtnProps } = useHandlePersonnelFilter()

  if(loading) return <Loading />

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 shadow-xl w-full">
      <span className="text-neutral-content uppercase font-bold">Personnel Filter</span>

      <select
        className="select mx-auto truncate hover:cursor-pointer"
        { ...selectProps }>
          <CreatePersonnelForm.PersonnelOptions />
      </select>
      <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

export const Search = () => {
  const { inputProps, clearBtnProps } = useHandleSearch()

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-2 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Search</span>

      <input
        type="text"
        className="input"
        placeholder="by mission description.."
        { ...inputProps } />
      <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

type DateRangeInputProps = { inputProps: { onChange: React.ChangeEventHandler<HTMLInputElement>, value: string }, children: React.ReactNode }

const DateRangeInput = (props: DateRangeInputProps) => {

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">{props.children}</label>
      <input
        data-testid="date-range-input"
        type="date"
        className="input hover:cursor-pointer" 
        { ...props.inputProps } />
    </div>
  )
}

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

const ClearFilterBtn = (props: ClearFilterBtnProps) => {

  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm font-[play] uppercase w-full"
      disabled={props.disabled}
      onClick={props.onClick}>
        Clear
    </button>
  )
}