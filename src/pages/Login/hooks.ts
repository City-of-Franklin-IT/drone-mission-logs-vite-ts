import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useHandleAuth = () => {
  const { instance, accounts, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if(inProgress !== "none") {
      return
    }

    const activeAccount = instance.getActiveAccount()

    if(accounts.length === 0 || !activeAccount) {
      instance.ssoSilent({
        scopes: ["openid", "profile"]
      }).then((response) => {
        if(response.account) {
          instance.setActiveAccount(response.account)
          navigate('/missions')
        }
      }).catch(error => {
        if(error.errorCode === "interaction_required") {
          window.location.href = '/'
        }
      })
    } else navigate('/missions')
  }, [instance, accounts.length, inProgress, navigate])
}