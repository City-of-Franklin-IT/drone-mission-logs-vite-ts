// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function PersonnelTable({ personnel }: { personnel: AppTypes.PersonnelRosterInterface[] }) {

  return (
    <Components.Table tableData={personnel} />
  )
}

export default PersonnelTable