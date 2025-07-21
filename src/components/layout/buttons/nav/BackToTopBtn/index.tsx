import { handleClick } from "./utils"

function BackToTopBtn({ topRef }: { topRef: React.RefObject<HTMLDivElement> }) {
  
  return (
    <button 
      type="button" 
      className="btn btn-secondary btn-outline btn-sm uppercase"
      onClick={() => handleClick(topRef)}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn