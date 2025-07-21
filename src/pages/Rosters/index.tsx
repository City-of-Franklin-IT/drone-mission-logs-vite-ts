// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import RostersContainer from "@/components/rosters/containers/RostersContainer"

function Rosters() {

  return (
    <Layout>
      <ErrorBoundary href={'/missions'}>
        <RostersContainer />
      </ErrorBoundary>
    </Layout>
  )
}

export default Rosters