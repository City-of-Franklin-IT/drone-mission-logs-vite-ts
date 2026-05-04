import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { useAuth } from "@/context/Auth"
import { MOCK_AUTH } from "@/context/Auth/constants"
import { infoPopup } from "@/utils/Toast/Toast"
import { getUserDepartment } from "./utils"

// Types
import { AccountInfo } from "@azure/msal-browser"

export const useGetToken = () => {
  const { token } = useAuth()
  return token
}

export const useEnableQuery = () => {
  const { token, isLoading, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoading && !token) {
      navigate("/")
    }
  }, [token, isLoading, navigate])

  return { enabled: !!token && !isLoading, token, refreshToken }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()

  useEffect(() => {
    if(MOCK_AUTH) return

    if(inProgress === "none") {
      const activeAccount = instance.getActiveAccount()

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem("redirectUrl")

        if(redirectUrl) {
          window.location.href = redirectUrl
          sessionStorage.removeItem("redirectUrl")
        }
      } else {
        window.location.pathname = "/"
      }
    }
  }, [inProgress, instance])
}

export const useActiveAccount = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const useAuthRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoading && isAuthenticated) {
      navigate("/missions")
    }
  }, [isAuthenticated, isLoading, navigate])
}

export const useUnauthRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoading && !isAuthenticated) {
      infoPopup("Unauthorized: Please Login")
      navigate("/")
    }
  }, [isAuthenticated, isLoading, navigate])
}

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: "Police" | "Fire" | "IT" | undefined; isLoading: boolean }>({
    department: undefined,
    isLoading: true
  })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(MOCK_AUTH) {
      setState({ department: "Police", isLoading: false })
      return
    }

    if(activeAccount && inProgress === "none" && !state.department) {
      getUserDepartment(instance, activeAccount as AccountInfo)
        .then((department) => setState({ department, isLoading: false }))
        .catch((err) => {
          console.log(err)
          setState((prev) => ({ ...prev, isLoading: false }))
        })
    } else if(inProgress === "none" && !activeAccount) {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [inProgress, state.department, activeAccount, instance])

  return { department: state.department, isLoading: state.isLoading }
}

export const withTokenRefresh = async <T,>(
  fn: () => Promise<T>,
  refresh: () => Promise<string | undefined>
): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    if(e instanceof Error && e.message === "401") await refresh()
    throw e
  }
}