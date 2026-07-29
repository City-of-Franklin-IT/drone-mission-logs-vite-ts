import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useMsal } from '@azure/msal-react'
import { MOCK_AUTH } from '@/context/Auth/constants'
import { infoPopup } from '@/utils/Toast/Toast'

export const useAuthCheck = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (MOCK_AUTH || pathname === '/') return

    if (inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      if (!activeAccount) {
        infoPopup('Unauthorized: Please Login')
        navigate('/')
      }
    }
  }, [inProgress, instance, navigate, pathname])
}