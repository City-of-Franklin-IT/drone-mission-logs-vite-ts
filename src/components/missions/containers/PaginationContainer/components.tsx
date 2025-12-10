import { useHandlePageNav } from "./hooks"

// Components
import PrevPageBtn from "@/components/layout/buttons/nav/PrevPageBtn"
import NextPageBtn from "@/components/layout/buttons/nav/NextPageBtn"

export const PageNavBtns = ({ count }: { count: number }) => { // Page nav buttons
  const { prevBtnProps, nextBtnProps, label } = useHandlePageNav(count)

  return (
    <div className="flex flex-col m-auto mt-auto w-fit xl:m-0">
      <div className="flex flex-col gap-1 items-center px-2 ml-auto">
        <div className="flex gap-4">
          <PrevPageBtn { ...prevBtnProps } />
          <NextPageBtn { ...nextBtnProps } />
        </div>
        <small className="text-neutral-content font-[play] uppercase">{label}</small>
      </div>
    </div>
  )
}