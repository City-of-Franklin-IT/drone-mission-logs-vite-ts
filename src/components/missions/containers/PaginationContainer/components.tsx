import { useHandlePageNav } from "./hooks"

// Components
import PrevPageBtn from "@/components/layout/buttons/nav/PrevPageBtn"
import NextPageBtn from "@/components/layout/buttons/nav/NextPageBtn"

export const PageNavBtns = ({ count }: { count: number }) => { // Page nav buttons
  const { pageBtnProps, label } = useHandlePageNav(count)

  return (
    <div className="flex flex-col ml-auto mt-auto w-fit">
      <div className="flex flex-col gap-1 items-center px-2 ml-auto">
        <div className="flex gap-4">
          <PrevPageBtn { ...pageBtnProps.prevPageBtnProps } />
          <NextPageBtn { ...pageBtnProps.nextPageBtnProps } />
        </div>
        <small className="text-neutral-content font-[play] uppercase">{label}</small>
      </div>
    </div>
  )
}