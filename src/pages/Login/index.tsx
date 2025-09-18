import { useHandleAuth } from './hooks'

// Components
import Layout from '@/components/layout/Layout'

function Login() {
  useHandleAuth()

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default Login