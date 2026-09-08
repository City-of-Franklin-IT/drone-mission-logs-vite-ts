import { useRef } from 'react'
import { useSetActivePage } from './hooks'
import { useElementHeightVar } from '@/helpers/hooks'

// Components
import * as Components from './components'

function Header() {
  const headerRef = useRef<HTMLHeadElement>(null)
  useElementHeightVar(headerRef, "--app-header-height")
  useSetActivePage()

  return (
    <header ref={headerRef} className="sticky top-0 z-50 flex flex-col font-[Play] w-full">
      <div className="flex flex-row gap-1 lg:gap-4 justify-between font-[Play] tracking-[.25rem] items-center bg-primary px-4 py-2 lg:px-8 lg:py-4 w-full shadow-xl 2xl:min-h-[10vh]">
        <Components.Title />

        <div className="hidden gap-2 min-w-0 shrink md:flex">
          <Components.Buttons />
        </div>

        <Components.MobileMenu />
      </div>

      <Components.HomeLink />
    </header>
  )
}

export default Header