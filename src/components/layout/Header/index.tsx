import { useSetActivePage } from './hooks'

// Components
import * as Components from './components'

function Header() {
  useSetActivePage()

  return (
    <header className="flex flex-col gap-10 justify-between font-[play] tracking-[.25rem] items-center bg-primary py-2 px-8 w-full h-[15vh] min-h-fit shadow-xl lg:flex-row lg:h-[10vh]">
      <Components.Title />
      <Components.BtnsMenu>
        <Components.Buttons />
      </Components.BtnsMenu>
    </header>
  )
}

export default Header