import { useAuthRedirect } from '@/helpers/hooks'
import { useHandleAuth } from './hooks'

function Login() {
  useHandleAuth()
  useAuthRedirect()

  return <></>
}

export default Login