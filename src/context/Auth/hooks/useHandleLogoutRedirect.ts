import { useMsal } from "@azure/msal-react"

export default () => {
  const { instance } = useMsal()

  return () => {
    instance.clearCache()
    
    window.location.href = '/'
  }
}