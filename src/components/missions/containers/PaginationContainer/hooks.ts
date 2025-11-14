import { useContext } from "react"
import MissionsCtx from "../../context"

export const useHandlePageNav = () => {
  const { currentPage, totalPages, dispatch } = useContext(MissionsCtx)

  const handlePrevBtn = () => {
    if(currentPage !== 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }
  }

  const handleNextBtn = () => {
    if(currentPage !== totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }
  }

  const prevBtnProps = { 
    onClick: handlePrevBtn,
    disabled: currentPage === 1
  }

  const nextBtnProps = { 
    onClick: handleNextBtn,
    disabled: !totalPages || currentPage === totalPages
  }

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { prevBtnProps, nextBtnProps, label }
}