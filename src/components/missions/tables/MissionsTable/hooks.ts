import { useState, useLayoutEffect } from "react"
import { iconMap } from "./utils"

/**
* Returns visibility boolean for table columns; hides certain columns on smaller devices
**/
export const useSetColumnVisibility = () => {
  const [state, setState] = useState<{ visible: boolean }>({ visible: false })

  useLayoutEffect(() => {
    const updateVisibility = () => {
      setState({ visible: window.innerWidth >= 1024 })
    }

    updateVisibility()

    window.addEventListener('resize', updateVisibility)

    return () => window.removeEventListener('resize', updateVisibility)
  }, [])

  return state.visible
}

/**
* Returns onClick handler for mission details button, expanded boolean, mission description visibility boolean, and expanded button icon source
**/
export const useHandleTableRow = () => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  const onDetailsBtnClick = () => {
    setState(prevState => ({ expanded: !prevState.expanded }))
  }

  const visible = useSetColumnVisibility()

  const btnIconSrc = !state.expanded ?
    iconMap.get('downArrow')! :
    iconMap.get('upArrow')!

  return { expanded: state.expanded, onDetailsBtnClick, visible, btnIconSrc }
}