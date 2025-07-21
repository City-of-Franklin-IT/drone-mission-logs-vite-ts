import { HeaderProvider } from "../Header/context"

// Components
import Header from "../Header"
import Footer from "../Footer"

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col w-full h-[100%] min-h-screen">
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <main>
        <div className="m-auto w-full h-full xl:w-[90%] 2xl:w-[80%]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout