import { Link } from 'react-router'
import { useShowDocsBtn } from './hooks'
import apiIcon from '@/assets/icons/api/api.png'

export const DocsBtn = () => {
  const { show } = useShowDocsBtn()

  if(!show) return null

  return (
    <Link to={'/docs'} className="absolute bottom-4 right-4 btn btn-ghost btn-sm">
      <img src={apiIcon} alt="API" className="w-6 h-6" />
    </Link>
  )
}
