// Components
import ErrorBoundary from "@/components/error/ErrorBoundary"
import * as Components from './components'

function Create() {

  return (
    <ErrorBoundary href={'/missions'}>
      <div className="my-10 lg:w-4/5 lg:mx-auto">
        <Components.CreateContainer />
      </div>
    </ErrorBoundary>
  )
}

export default Create