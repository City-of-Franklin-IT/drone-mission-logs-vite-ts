import fpdIcon from '@/assets/icons/fpd/fpd.png'
import ffdIcon from '@/assets/icons/ffd/ffd.png'

export const handleTitleIconSrc = () => {
  const location = window.location

  return location.hostname === 'pdapps.franklintn.gov' ? fpdIcon : ffdIcon
}