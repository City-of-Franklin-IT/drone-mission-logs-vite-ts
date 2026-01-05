import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useActiveAccount } from "@/helpers/hooks"

/**
* Redirects authenticated users to Missions page; unauthenticated users to login page
**/
export const useRedirect = () => {
  const navigate = useNavigate()

  const activeAccount = useActiveAccount()

  useEffect(() => {
    if(activeAccount) {
      navigate('/missions')
    } else {
      window.location.href = '/'
    }
  }, [activeAccount, navigate])
}