import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from "@/config"
import { infoPopup } from "@/utils/Toast/Toast"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined, isLoading: boolean }>({ token: undefined, isLoading: true })

  const { instance, accounts, inProgress } = useMsal()

  if(NODE_ENV === 'development') {
    return { token: 'dev-token', isLoading: false }
  }

  const checkToken = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      window.location.href = '/'
      return
    }

    if(!activeAccount && accounts.length > 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      instance.setActiveAccount(accounts[0])
      return
    }

    let token: string | undefined = undefined

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) { // Check if token is expired or about to expire
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()
  
      if(expiresOn > now + 3000000) { // Still valid
        token = activeAccount.idToken
        setState(({ token, isLoading: false }))
        return
      }
  
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true
      }
  
      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState(({ token: response.idToken, isLoading: false }))
    }

    if(activeAccount && !activeAccount.idTokenClaims) { // Active account but !idTokenClaims
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount
      }

      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState(({ token: response.idToken, isLoading: false }))
    }

    setState(prevState => ({ ...prevState, isLoading: false }))
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress, accounts.length])

  return state
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const { token, isLoading } = useGetToken()

  useEffect(() => {
    if(isLoading) {
      setState({ enabled: false })
    } else setState({ enabled: !!token })
  }, [token, isLoading])

  return { enabled: state.enabled, token }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(inProgress === 'none') {

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl') // Check for redirectUrl

        if(redirectUrl) {        
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else window.location.pathname = '/drone'
    }
  }, [activeAccount, inProgress])
}

export const useActiveAccount = () => {
  const [state, setState] = useState<{ authenticated: boolean }>({ authenticated: false })
  const { instance, inProgress } = useMsal()

  useEffect(() => {
    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      setState({ authenticated: !!activeAccount })
    }
  }, [instance, inProgress])

  return state.authenticated
}

export const useAuthRedirect = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      if(activeAccount) {
        navigate('/missions')
      }
    }
  }, [inProgress, instance, navigate])
}

export const useUnauthRedirect = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      
      if(!activeAccount) {
        infoPopup('Unauthorized: Please Login')
        navigate('/')
      }
    }
  }, [inProgress, instance, navigate])
}