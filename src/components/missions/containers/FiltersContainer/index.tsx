// Components
import * as Components from './components'

function FiltersContainer() {

  return (
    <div className="flex gap-10 w-fit mr-auto">
      <Components.DateRangeFilterInputs />
      <Components.PersonnelFilter />
    </div>
  )
}

export default FiltersContainer