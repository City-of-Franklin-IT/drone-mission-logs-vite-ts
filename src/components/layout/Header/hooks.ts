import { useContext, useEffect } from "react"
import { useLocation } from "react-router"
import HeaderCtx from "./context"

// Types
import { PagesType } from "./context"

/**
* Updates 
**/
export const useSetActivePage = () => {
  const { activePage, dispatch } = useContext(HeaderCtx)

  const location = useLocation()

  useEffect(() => {
    const { pathname } = location

    let payload: PagesType = 'Login'

    switch(pathname) {
      case '/missions':
        payload = 'Missions'
        break
      case '/create/mission':
        payload = 'Create Mission'
        break
      case '/rosters':
        payload = 'Manage Rosters'
        break
      default:
        payload = 'Login'
    }

    if(payload !== activePage) {
      dispatch({ type: 'SET_ACTIVE_PAGE', payload })
    }
  }, [dispatch, location, activePage])
}