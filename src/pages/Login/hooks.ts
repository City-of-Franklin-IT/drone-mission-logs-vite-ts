import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { useAuth } from "@/context/Auth"
import { MOCK_AUTH } from "@/context/Auth/constants"

export const useHandleAuth = () => {
  const { instance, inProgress } = useMsal()
  const { refreshToken } = useAuth()
  const navigate = useNavigate()
  const hasAttemptedSsoRef = useRef(false)

  useEffect(() => {
    if(MOCK_AUTH) {
      navigate('/missions')
      return
    }

    if(inProgress !== "none") {
      return
    }

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount) {
      if(hasAttemptedSsoRef.current) return
      hasAttemptedSsoRef.current = true

      instance.ssoSilent({
        scopes: ["openid", "profile"]
      }).then((response) => {
        if(response.account) {
          instance.setActiveAccount(response.account)
          refreshToken()
        }
      }).catch(() => {
        instance.loginRedirect({ scopes: ["openid", "profile"] })
      })
    } else refreshToken()
  }, [instance, inProgress, refreshToken, navigate])
}