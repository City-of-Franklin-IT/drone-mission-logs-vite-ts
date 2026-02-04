// Components
import * as Components from './components'

function Footer() {

  return (
    <footer className="relative flex flex-col h-[24vh] bg-neutral mt-auto">
      <span className="text-neutral-content text-lg font-[Ubuntu Sans] text-bold tracking-[.4rem] text-center m-auto lg:text-xl">Developed by City of Franklin Information Technology</span>
      <Components.DocsBtn />
    </footer>
  )
}
export default Footer