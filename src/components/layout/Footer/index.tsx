// Components
import * as Components from './components'

function Footer() {

  return (
    <footer className="relative flex flex-col bg-neutral mt-auto px-4 py-6 pb-12 lg:px-0 lg:pb-6 lg:min-h-[24vh]">
      <p className="text-neutral-content text-sm font-[ubuntu] text-bold tracking-[.15rem] text-center m-auto lg:text-lg lg:tracking-[.4rem]">Developed by City of Franklin Information Technology</p>
      <Components.DocsBtn />
    </footer>
  )
}
export default Footer