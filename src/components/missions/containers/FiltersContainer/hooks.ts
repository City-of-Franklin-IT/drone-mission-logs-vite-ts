import React, { useContext } from "react"
import MissionsCtx from "../../context"
import { useGetPersonnel } from "../../forms/create/CreatePersonnelForm/hooks"

export const useHandleDateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(MissionsCtx)

  const startOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload })
  }

  const startInputProps = {
    onChange: startOnChange,
    value: dateRangeFilter.start
  }

  const endOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload })
  }

  const endInputProps = {
    onChange: endOnChange,
    value: dateRangeFilter.end
  }

  const clearBtnProps = {
    onClick: () => {
      dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '' })
      dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '' })
    },
    disabled: !dateRangeFilter.start && !dateRangeFilter.end
  }

  return { startInputProps, endInputProps, clearBtnProps }
}

export const useHandlePersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(MissionsCtx)

  const { isLoading } = useGetPersonnel()

  const selectProps = {
    value: personnelFilter,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: e.currentTarget.value })
  }

  const clearBtnProps = {
    onClick: () => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: '' }),
    disabled: !personnelFilter
  }

  return { loading: isLoading, selectProps, clearBtnProps }
}

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(MissionsCtx)

  const inputProps = {
    value: searchValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })
  }

  const clearBtnProps = {
    onClick: () => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' }),
    disabled: !searchValue
  }

  return { inputProps, clearBtnProps }
}