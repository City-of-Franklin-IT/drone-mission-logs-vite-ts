import React, { useContext } from "react"
import MissionsCtx from "../../context"
import { useGetPersonnel } from "../../forms/create/CreatePersonnelForm/hooks"

/**
* Returns filter start date and end date input props, and clear date range filter button props
**/
export const useHandleDateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(MissionsCtx)

  const startOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    if(payload !== dateRangeFilter.start) {
      dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload })
    }
  }

  const startInputProps = {
    onChange: startOnChange,
    value: dateRangeFilter.start
  }

  const endOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    if(payload !== dateRangeFilter.end) {
      dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload })
    }
  }

  const endInputProps = {
    onChange: endOnChange,
    value: dateRangeFilter.end
  }

  return { startInputProps, endInputProps }
}

/**
* Returns personnel filter select props including onChange handler, and clear personnel filter button props
**/
export const useHandlePersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(MissionsCtx)

  const { isLoading } = useGetPersonnel()

  const selectProps = {
    value: personnelFilter,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: e.currentTarget.value })
  }

  return { loading: isLoading, selectProps }
}

/**
* Returns search component input props and clear search value button props
**/
export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(MissionsCtx)

  const inputProps = {
    value: searchValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })
  }

  return { inputProps }
}

/**
* Returns clear-all-filters button props, disabled unless at least one filter is active
**/
export const useHandleClearAllFilters = () => {
  const { dateRangeFilter, personnelFilter, searchValue, dispatch } = useContext(MissionsCtx)

  const hasActiveFilter = !!dateRangeFilter.start || !!dateRangeFilter.end || !!personnelFilter || !!searchValue

  return {
    onClick: () => dispatch({ type: 'CLEAR_ALL_FILTERS' }),
    disabled: !hasActiveFilter
  }
}