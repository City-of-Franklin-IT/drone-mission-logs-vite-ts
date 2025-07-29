// Components
import * as Components from './components'

function FiltersContainer() {

  return (
    <div className="flex flex-col gap-4 items-end mx-auto w-fit lg:flex-row lg:gap-10 lg:mr-auto lg:mx-0">
      <Components.PersonnelFilter />
      <Components.DateRangeFilterInputs />
      <Components.Search />
    </div>
  )
}

export default FiltersContainer