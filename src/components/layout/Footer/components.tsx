import { Link } from 'react-router'
import { useShowDocsBtn } from './hooks'
import apiIcon from '@/assets/icons/api/api.png'

export const DocsBtn = () => {
  const { show } = useShowDocsBtn()

  if(!show) return null

  return (
    <Link to={'/docs'} className="absolute flex flex-col items-center text-neutral-content bottom-4 right-6 hover:text-secondary">
      <img src={apiIcon} alt="API docs icon" className="w-8" />
      <small className="uppercase">API Docs</small>
    </Link>
  )
}
