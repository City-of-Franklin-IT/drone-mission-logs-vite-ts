import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useActiveAccount } from "@/helpers/hooks"

export const useRedirect = (href: string) => {
  const navigate = useNavigate()

  const activeAccount = useActiveAccount()

  useEffect(() => {
    if(activeAccount) {
      navigate(href)
    } else navigate('/')
  }, [activeAccount, navigate, href])
}