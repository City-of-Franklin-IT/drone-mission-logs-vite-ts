// Components
import * as Components from './components'

function Header() {

  return (
    <header className="flex justify-between font-[play] tracking-[.25rem] items-center bg-primary py-1 px-8 w-full h-[15vh] min-h-fit shadow-xl 2xl:h-[10vh]">
      <Components.Title />
      <Components.BtnsMenu>
        <Components.Buttons />
      </Components.BtnsMenu>
    </header>
  )
}

export default Header