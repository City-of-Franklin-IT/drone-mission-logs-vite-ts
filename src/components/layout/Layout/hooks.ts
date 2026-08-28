import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useMsal } from '@azure/msal-react'
import { infoPopup } from '@/utils/Toast/Toast'

export const useAuthCheck = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (import.meta.env.DEV || pathname === '/') return

    if (inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      if (!activeAccount) {
        infoPopup('Unauthorized: Please Login')
        navigate('/')
      }
    }
  }, [inProgress, instance, navigate, pathname])
}