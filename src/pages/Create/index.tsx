import { useUnauthRedirect } from "@/helpers/hooks"

// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import * as Components from './components'

function Create() {
  useUnauthRedirect()

  return (
    <Layout>
      <ErrorBoundary href={'/missions'}>
        <div className="my-10 lg:w-4/5 lg:mx-auto">
          <Components.CreateContainer />
        </div>
      </ErrorBoundary>
    </Layout>
  )
}

export default Create