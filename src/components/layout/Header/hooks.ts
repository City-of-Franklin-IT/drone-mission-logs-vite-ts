import { useContext, useMemo } from "react"
import HeaderCtx from "./context"

export const useHandleTitleVisibility = () => {
  const { expanded } = useContext(HeaderCtx)

  const width = window.innerWidth

  return useMemo(() => {
    if(width >= 1024 || !expanded) {
      return true
    }
    
    return false
  }, [expanded, width])
}