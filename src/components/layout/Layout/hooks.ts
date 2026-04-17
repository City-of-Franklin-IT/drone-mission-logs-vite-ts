import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useMsal } from '@azure/msal-react'
import { NODE_ENV } from '@/config'
import { infoPopup } from '@/utils/Toast/Toast'

export const useAuthCheck = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if (NODE_ENV === 'development') return

    if (inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      if (!activeAccount) {
        infoPopup('Unauthorized: Please Login')
        navigate('/')
      }
    }
  }, [inProgress, instance, navigate])
}