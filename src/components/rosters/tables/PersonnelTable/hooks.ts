import { useContext } from "react"
import RostersCtx from "../../context"

// Types
import { FormType } from "../../context"
import * as AppTypes from '@/context/App/types'

/**
* Returns table row onClick handler
**/
export const useOnTableRowClick = (formType: FormType, uuid: string) => {
  const { dispatch } = useContext(RostersCtx)

  const onClick = () => {
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
    dispatch({ type: 'SET_FORM_UUID', payload: uuid })
  }

  return onClick
}

/**
* Returns table row props and missions 
**/
export const useHandleTableRow = ({ tableData, index }: { tableData: AppTypes.PersonnelRosterInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick('personnel', tableData.uuid)

  const missionsCount = Array.isArray(tableData.Personnel) ? tableData.Personnel.map(item => (item.Mission)).length : '-'

  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null

  const className = `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const trProps = {
    className,
    onClick: onTableRowClick
  }

  return { trProps, missionsCount }
}