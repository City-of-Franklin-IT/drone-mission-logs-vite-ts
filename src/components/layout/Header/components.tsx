import { useContext } from "react"
import { useLocation, Link } from "react-router"
import { APP_TITLE } from '../../../config'
import cofIcon from '@/assets/icons/cof/cof-primary-content.svg'
import { useActiveAccount } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import HeaderCtx from "./context"

export const Title = () => {

  return (
    <Link to={'/missions'} className="flex flex-col text-primary-content text-center mt-4 w-fit lg:my-4">
      <div className="flex gap-4 text-primary-content items-center justify-center">
        <img src={cofIcon} alt="cof icon" className="w-20" />
        <h1 className="text-xl font-bold text-center md:text-2xl lg:text-4xl">{APP_TITLE}</h1>
      </div>
    </Link>
  )
}

export const Buttons = () => {
  const { pathname } = useLocation()

  if(pathname === '/') return null

  return (
    <div className="flex gap-2 overflow-y-visible w-fit pl-4 pb-2 flex-wrap justify-around lg:pb-0">
      <HeaderBtn to={'/missions'}>Missions</HeaderBtn>
      <HeaderBtn to={'/create/mission'}>Create Mission</HeaderBtn>
      <HeaderBtn to={'/rosters'}>Manage Rosters</HeaderBtn>
      <LogoutBtn />
    </div>
  )
}

export const HomeLink = () => {

  return (
    <a href={'/home'} className="text-neutral-content uppercase p-3 m-auto bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral">Back To All PD Apps</a>
  )
}

type HeaderBtnProps = { to: string, children: React.ReactNode }

const HeaderBtn = (props: HeaderBtnProps) => {
  const { activePage } = useContext(HeaderCtx)

  const activeAccount = useActiveAccount()

  const { pathname } = useLocation()

  if(!activeAccount || pathname === '/') return null

  const active = activePage === props.children

  return (
    <Link 
      to={props.to} 
      className={`btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? 'text-warning' : 'text-neutral-content' }`}>
        {props.children}
    </Link>
  )
}

const LogoutBtn = () => { // Logout button
  const activeAccount = useActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}