import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

export const useDisableBtn = () => {
  const { formState: { isValid, isSubmitting } } = useFormContext()

  return useMemo(() => {
    if(!isValid || isSubmitting) {
      return true
    } return false
  }, [isValid, isSubmitting])
}