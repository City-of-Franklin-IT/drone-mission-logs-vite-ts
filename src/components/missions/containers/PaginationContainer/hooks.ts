import { useContext, useEffect } from "react"
import MissionsCtx from "../../context"

export const useHandlePageNav = (count: number) => {
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

  useEffect(() => {
    if(count > 25) {
      const payload = Math.ceil(count / 25)

      if(totalPages !== payload) {
        dispatch({ type: 'SET_TOTAL_PAGES', payload }) 
      }
    }
  }, [totalPages, count])

  return { prevBtnProps, nextBtnProps, label }
}