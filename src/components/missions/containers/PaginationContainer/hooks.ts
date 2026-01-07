import { useContext, useEffect } from "react"
import MissionsCtx from "../../context"

/**
* Returns pagination button props and label; handles updating totalPages in context
**/
export const useHandlePageNav = (count: number) => {
  const { currentPage, totalPages, dateRangeFilter, personnelFilter, searchValue, dispatch } = useContext(MissionsCtx)

  const btnOnClick = (type: 'prev' | 'next') => {
    const payload = type === 'prev' ?
      currentPage - 1 :
      currentPage + 1

    dispatch({ type: 'SET_CURRENT_PAGE', payload })
  }

  const prevPageBtnProps = {
    onClick: () => btnOnClick('prev'),
    disabled: currentPage === 1
  }

  const nextPageBtnProps = {
    onClick: () => btnOnClick('next'),
    disabled: !totalPages || currentPage === totalPages
  }

  const pageBtnProps = {
    prevPageBtnProps,
    nextPageBtnProps
  }

  const label = `Page ${ currentPage } / ${ totalPages }`

  useEffect(() => {
    const payload = count > 25 ?
      Math.ceil(count / 25) :
      1

    dispatch({ type: 'SET_TOTAL_PAGES', payload })
  }, [count, totalPages])

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
  }, [dateRangeFilter, personnelFilter, searchValue])

  return { pageBtnProps, label }
}