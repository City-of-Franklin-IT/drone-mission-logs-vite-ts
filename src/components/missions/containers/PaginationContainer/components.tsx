import { useContext } from "react"
import MissionsCtx from "../../context"
import { useHandleNavBtns } from "./hooks"

// Components
import PrevPageBtn from "@/components/layout/buttons/nav/PrevPageBtn"
import NextPageBtn from "@/components/layout/buttons/nav/NextPageBtn"

export const PageNavBtns = () => { // Page nav buttons
  const { currentPage, totalPages } = useContext(MissionsCtx)
  
  const { handlePrevBtn, handleNextBtn, label } = useHandleNavBtns()

  return (
    <div className="flex flex-col ml-auto w-fit">
      <div className="flex flex-col gap-1 items-center px-2 ml-auto">
        <div className="flex gap-4">
          <PrevPageBtn 
            onClick={handlePrevBtn}
            disabled={currentPage === 1} />
          <NextPageBtn 
            onClick={handleNextBtn}
            disabled={!totalPages || currentPage === totalPages} />
        </div>
        <small data-testid="page-nav-label" className="text-neutral-content font-[play] uppercase">{label}</small>
      </div>
    </div>
  )
}