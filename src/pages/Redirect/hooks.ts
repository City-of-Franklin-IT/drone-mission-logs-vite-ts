import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useActiveAccount } from "@/helpers/hooks"

export const useRedirect = () => {
  const navigate = useNavigate()

  const activeAccount = useActiveAccount()

  useEffect(() => {
    if(activeAccount) {
      navigate('/missions')
    } else navigate('/')
  }, [activeAccount, navigate])
}