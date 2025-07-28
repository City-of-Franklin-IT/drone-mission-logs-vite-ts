// Components
import * as Components from './components'

function Header() {

  return (
    <header className="flex flex-col gap-10 justify-between font-[play] tracking-[.25rem] items-center bg-primary py-1 px-8 w-full h-[15vh] min-h-fit shadow-xl 2xl:flex-row 2xl:h-[10vh]">
      <Components.Title />
      <Components.BtnsMenu>
        <Components.Buttons />
      </Components.BtnsMenu>
    </header>
  )
}

export default Header