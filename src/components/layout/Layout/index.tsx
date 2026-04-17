import { Outlet } from "react-router"
import { HeaderProvider } from "../Header/context"
import { useAuthCheck } from "./hooks"

// Components
import Header from "../Header"
import Footer from "../Footer"
import PageWrapper from "@/utils/PageWrapper"

function Layout() {
  useAuthCheck()

  return (
    <div className="flex flex-col w-full h-[100%] min-h-screen">
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <main>
        <PageWrapper>
          <div className="m-auto w-full h-full xl:w-[90%] 2xl:w-[80%]">
            <Outlet />
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}

export default Layout