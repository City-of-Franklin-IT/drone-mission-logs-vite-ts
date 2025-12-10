// Components
import * as Components from './components'

function PaginationContainer({ count }: { count: number }) {
  
  return (
    <Components.PageNavBtns count={count} />
  )
}

export default PaginationContainer