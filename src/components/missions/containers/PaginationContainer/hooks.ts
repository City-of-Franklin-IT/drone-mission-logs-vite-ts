import { useContext, useCallback } from "react"
import MissionsCtx from "../../context"

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(MissionsCtx)

  const handlePrevBtn = useCallback(() => {
    if(currentPage !== 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }
  }, [currentPage, dispatch])

  const handleNextBtn = useCallback(() => {
    if(currentPage !== totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }
  }, [currentPage, totalPages, dispatch])

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { handlePrevBtn, handleNextBtn, label }
}