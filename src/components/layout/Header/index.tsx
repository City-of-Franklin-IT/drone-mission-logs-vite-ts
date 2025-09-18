import { useSetActivePage } from './hooks'

// Components
import * as Components from './components'

function Header() {
  useSetActivePage()

  return (
    <header className="flex flex-col font-[play] w-full">
      <div className="flex justify-between font-[play] tracking-[.25rem] items-center bg-gradient-to-r from-primary/80 to-primary py-1 px-8 h-[15vh] shadow-xl 2xl:h-[10vh]">
        <Components.Title />

        <div className="flex gap-2">
          <Components.Buttons />
        </div>
      </div>

      <Components.HomeLink />
    </header>
  )
}

export default Header