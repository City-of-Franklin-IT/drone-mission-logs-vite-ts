import icon from '@/assets/icons/loading/loading.svg'

function Loading() {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <img src={icon} alt="loading icon" className="w-40 animate-pulse" />
    </div>
  )
}

export default Loading