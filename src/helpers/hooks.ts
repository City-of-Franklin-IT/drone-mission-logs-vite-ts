import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from "@/config"
import { infoPopup } from "@/utils/Toast/Toast"
import { setAuth } from "@/context/Auth/config"
import { getUserDepartment } from "./utils"

// Types
import { AccountInfo, BrowserAuthError } from "@azure/msal-browser"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined, isLoading: boolean, popupBlocked: boolean }>({ token: undefined, isLoading: true, popupBlocked: false })

  const { instance, accounts, inProgress } = useMsal()

  if(NODE_ENV === 'development') {
    return { token: 'dev-token', isLoading: false, popupBlocked: false }
  }

  const checkToken = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))

    const activeAccount = instance.getActiveAccount()

    const isEdge = /Edg/.test(navigator.userAgent)

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

    const { redirectUri } = setAuth()

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) {
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()

      if(expiresOn > now + 3000000) {
        setState({ token: activeAccount.idToken, isLoading: false, popupBlocked: false })
        return
      }

      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true,
        redirectUri: `${ redirectUri }/redirect.html`
      }

      if(isEdge) { // Acquire token via popup for Edge users
        try {
          const response = await instance.acquireTokenPopup(request)
          setState({ token: response.idToken, isLoading: false, popupBlocked: false })
        } catch(error) {
          if(error instanceof BrowserAuthError && (error.errorCode === 'popup_window_error' || error.errorCode === 'empty_window_error')) {
            setState({ token: undefined, isLoading: false, popupBlocked: true })
          } else throw error
        }
      } else {
        const response = await instance.acquireTokenSilent(request)
        setState({ token: response.idToken, isLoading: false, popupBlocked: false })
      }

      return
    }

    if(activeAccount && !activeAccount.idTokenClaims) {
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        redirectUri: `${ redirectUri }/redirect.html`
      }

      if(isEdge) { // Acquire token via popup for Edge users
        try {
          const response = await instance.acquireTokenPopup(request)
          setState({ token: response.idToken, isLoading: false, popupBlocked: false })
        } catch(error) {
          if(error instanceof BrowserAuthError && (error.errorCode === 'popup_window_error' || error.errorCode === 'empty_window_error')) {
            setState({ token: undefined, isLoading: false, popupBlocked: true })
          } else throw error
        }
      } else {
        const response = await instance.acquireTokenSilent(request)
        setState({ token: response.idToken, isLoading: false, popupBlocked: false })
      }

      return
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

  const { token, isLoading, popupBlocked } = useGetToken()

  useEffect(() => {
    if(isLoading) {
      setState({ enabled: false })
    } else setState({ enabled: !!token })
  }, [token, isLoading])

  useEffect(() => {
    if(popupBlocked) {
      infoPopup('Please disable popup blocker for this site')
    }
  }, [popupBlocked])

  return { enabled: state.enabled, token }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const development = NODE_ENV === 'development'

  useEffect(() => {
    if(development) return

    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl')

        if(redirectUrl) {
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else {
        window.location.pathname = '/'
      }
    }
  }, [inProgress, development, instance])
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

  if(NODE_ENV === 'development') return

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

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: 'Police' | 'Fire' | 'IT' | undefined, isLoading: boolean }>({ department: undefined, isLoading: true })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(NODE_ENV === 'development') {
      setState({ department: 'Police', isLoading: false })
      return
    }

    if(activeAccount && inProgress === 'none' && !state.department) { // Get user department
      getUserDepartment(instance, activeAccount as AccountInfo)
        .then(department => setState({ department, isLoading: false }))
        .catch((err) => {
          console.log(err)
          setState(prev => ({ ...prev, isLoading: false }))
        })
    } else if (inProgress === 'none' && !activeAccount) {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [inProgress, state.department])

  return { department: state.department, isLoading: state.isLoading }
}