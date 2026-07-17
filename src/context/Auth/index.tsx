import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useMsal } from "@azure/msal-react"
import { acquireRequest, loginRequest } from "@/context/Auth/config"
import { MOCK_AUTH, MOCK_TOKEN } from "@/context/Auth/constants"

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: () => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthCtxProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if(MOCK_AUTH) {
      setToken(MOCK_TOKEN)
      setIsReady(true)
      return
    }

    if(inProgress !== "none") {
      return
    }

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsReady(true)
      return
    }

    if(!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      const newActiveAccount = instance.getActiveAccount()

      if(newActiveAccount) {
        instance.acquireTokenSilent({
          ...acquireRequest(newActiveAccount),
          account: newActiveAccount
        }).then((response) => {
          setToken(response.accessToken)
          setIsReady(true)
        }).catch(() => {
          instance.loginRedirect(loginRequest)
        })
      }
      return
    }

    if(activeAccount) {
      instance.acquireTokenSilent({
        ...acquireRequest(activeAccount),
        account: activeAccount
      }).then((response) => {
        setToken(response.accessToken)
        setIsReady(true)
      }).catch(() => {
        instance.loginRedirect(loginRequest)
      })
    } else {
      setToken(undefined)
      setIsReady(true)
    }
  }, [inProgress, accounts.length, instance])

  const refreshToken = async (): Promise<string | undefined> => {
    if(MOCK_AUTH) return MOCK_TOKEN

    const activeAccount = instance.getActiveAccount()
    if(!activeAccount) return undefined

    try {
      const result = await instance.acquireTokenSilent({
        ...acquireRequest(activeAccount),
        account: activeAccount,
        forceRefresh: true
      })
      setToken(result.accessToken)
      return result.accessToken
    } catch {
      setToken(undefined)
      return undefined
    }
  }

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading: !isReady && !MOCK_AUTH,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth must be used within AuthCtxProvider")
  }
  return context
}
