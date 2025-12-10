import { useSetActivePage } from './hooks'

// Components
import * as Components from './components'

function Header() {
  useSetActivePage()

  return (
    <header className="flex flex-col font-[play] w-full">
      <div className="flex flex-col gap-4 justify-between font-[play] tracking-[.25rem] items-center bg-primary px-8 w-full shadow-xl 2xl:h-[10vh] lg:flex-row">
        <Components.Title />

        <div className="flex gap-2 overflow-hidden w-fit lg:w-auto">
          <Components.Buttons />
        </div>
      </div>

      <Components.HomeLink />
    </header>
  )
}

export default Header