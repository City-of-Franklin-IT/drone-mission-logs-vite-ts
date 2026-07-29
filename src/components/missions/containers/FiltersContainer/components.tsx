import { useHandleClearAllFilters, useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from './hooks'

// Components
import Loading from "@/components/layout/loading/Loading"
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { startInputProps, endInputProps } = useHandleDateRangeFilterInputs()

  return (
    <div className="flex flex-col gap-1 items-center w-xs">
      <span className="text-neutral-content/50 font-[play] font-bold">Date Range</span>
      <div className="flex flex-row items-center gap-4 font-[play] px-2 justify-center flex-wrap w-full md:flex-nowrap">
        <DateRangeInput inputProps={startInputProps}>
          Start:
        </DateRangeInput>
        <DateRangeInput inputProps={endInputProps}>
          End:
        </DateRangeInput>
      </div>
    </div>
  )
}

export const PersonnelFilter = () => {
  const { loading, selectProps } = useHandlePersonnelFilter()

  if(loading) return <Loading />

  return (
    <div className="flex flex-col gap-1 items-center w-55">
      <span className="text-neutral-content/50 font-[play] font-bold mr-auto">Personnel Filter</span>

      <select
        className="select select-sm text-neutral-content mx-auto truncate bg-neutral hover:cursor-pointer"
        { ...selectProps }>
          <CreatePersonnelForm.PersonnelOptions />
      </select>
    </div>
  )
}

export const Search = () => {
  const { inputProps } = useHandleSearch()

  return (
    <div className="flex flex-col gap-1 items-center w-55">
      <span className="text-neutral-content/50 font-[play] font-bold mr-auto">Search</span>

      <input
        type="text"
        className="input input-sm text-neutral-content bg-neutral"
        placeholder="by mission description.."
        { ...inputProps } />
    </div>
  )
}

export const ClearAllFiltersBtn = () => {
  const clearBtnProps = useHandleClearAllFilters()

  return <ClearFilterBtn { ...clearBtnProps } />
}

type DateRangeInputProps = {
  inputProps: {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: string
  }
  children: React.ReactNode
}

const DateRangeInput = (props: DateRangeInputProps) => (
  <div className="flex flex-row gap-2 items-center flex-1 font-[play]">
    <label className="label text-sm text-neutral-content">{props.children}</label>
    <input
      data-testid="date-range-input"
      type="date"
      className="input input-sm text-neutral-content bg-neutral hover:cursor-pointer w-full"
      { ...props.inputProps } />
  </div>
)

type ClearFilterBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}

const ClearFilterBtn = (props: ClearFilterBtnProps) => (
  <button
    type="button"
    className="btn btn-secondary btn-sm btn-wide font-[play] uppercase"
    disabled={props.disabled}
    onClick={props.onClick}>
      Clear All
  </button>
)