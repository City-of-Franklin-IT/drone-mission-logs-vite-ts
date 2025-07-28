// Components
import * as Components from './components'

function FiltersContainer() {

  return (
    <div className="flex flex-col gap-4 w-fit mx-auto xl:flex-row xl:gap-10 xl:mr-auto xl:mx-0">
      <Components.PersonnelFilter />
      <Components.DateRangeFilterInputs />
      <Components.Search />
    </div>
  )
}

export default FiltersContainer