import { useActiveAccount } from "@/helpers/hooks"

export const useShowDocsBtn = () => {
  const authenticated = useActiveAccount()

  return { show: authenticated }
}
