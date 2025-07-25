import React, { useContext } from "react"
import { useLocation, Link } from "react-router"
import HeaderCtx from "./context"
import { APP_TITLE } from '../../../config'
import { useActiveAccount } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useHandleTitleVisibility } from './hooks'

// Icons
import inactiveMenuIcon from '@/assets/icons/menu/menu-light.svg'
import activeMenuIcon from '@/assets/icons/menu/menu.svg'

export const Title = () => {
  const visible = useHandleTitleVisibility()

  if(!visible) return null

  return (
    <Link to={'/missions'} className="flex flex-col text-primary-content items-start w-fit">
      <h1 className="text-lg font-bold whitespace-nowrap lg:text-2xl">Franklin Police Department</h1>
      <span className="text-sm ml-6 w-fit lg:text-xl lg:whitespace-nowrap">{APP_TITLE}</span>
    </Link>
  )
}

export const BtnsMenu = ({ children }: { children: React.ReactNode }) => {
  const { expanded, dispatch } = useContext(HeaderCtx)

  return (
    <div className="flex justify-between ml-auto w-full lg:w-fit lg:gap-4">
      {children}
      <button 
        type="button"
        className="flex flex-col justify-center ml-auto w-16 hover:cursor-pointer"
        onClick={() => dispatch({ type: 'TOGGLE_EXPANDED' })}>
          <img src={!expanded ? inactiveMenuIcon : activeMenuIcon} alt="menu icon" className="w-fit" />
      </button>
    </div>
  )
}

export const Buttons = () => {
  const { expanded } = useContext(HeaderCtx)

  if(!expanded) return null

  return (
    <div className="flex flex-col items-center gap-4 mr-auto md:flex-row md:ml-auto">
      <HeaderBtn to={'/missions'}>Missions</HeaderBtn>
      <HeaderBtn to={'/create/mission'}>Create Mission</HeaderBtn>
      <HeaderBtn to={'/rosters'}>Manage Rosters</HeaderBtn>
      <HeaderBtn to={'/'}>Login</HeaderBtn>
      <LogoutBtn />
    </div>
  )
}

type HeaderBtnProps = { to: string, children: React.ReactNode }

const HeaderBtn = (props: HeaderBtnProps) => {
  const activeAccount = useActiveAccount()

  const pathname = useLocation().pathname

  // TODO remove for prod
  // if(activeAccount || pathname === '/') return null

  return (
    <Link 
      to={props.to} 
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
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
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        Logout
    </button>
  )
}