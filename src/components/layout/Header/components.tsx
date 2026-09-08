import { Menu, X } from "lucide-react"
import { useContext } from 'react'
import { useLocation, Link } from 'react-router'
import { useActiveAccount } from '@/helpers/hooks'
import useHandleLogoutRedirect from '@/context/Auth/hooks/useHandleLogoutRedirect'
import { useHandleMobileMenu } from './hooks'
import HeaderCtx from './context'
import { handleTitleIconSrc } from './utils'

export const Title = () => {
  const iconSrc = handleTitleIconSrc()

  return (
    <Link
      to={'/missions'}
      className="flex items-center gap-3 flex-shrink-0 overflow-hidden md:gap-4 lg:gap-6"
    >
      <img src={iconSrc} alt="department icon" className="w-8 flex-shrink-0 md:w-10 lg:w-18" />
      <h1 className="font-bold text-xl text-primary-content truncate md:text-2xl lg:text-5xl">
        {import.meta.env.VITE_APP_TITLE}
      </h1>
    </Link>
  )
}

export const Buttons = () => {
  const { pathname } = useLocation()

  if(pathname === '/') return null

  return (
    <div className="flex gap-2 overflow-y-visible pl-4 flex-wrap justify-end">
      <HeaderBtn to={'/missions'}>Missions</HeaderBtn>
      <HeaderBtn to={'/create/mission'}>Create Mission</HeaderBtn>
      <HeaderBtn to={'/rosters'}>Manage Rosters</HeaderBtn>
      <HelpDoc />
      <LogoutBtn />
    </div>
  )
}

export const HomeLink = () => {
  const label =
    window.location.host === 'pdapps.franklintn.gov'
      ? 'Back To All PD Apps'
      : 'Back To All FFD Apps'

  return (
    <div className="relative hidden justify-center md:flex">
      <a
        href={'/home'}
        className="text-neutral-content uppercase p-3 bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral">
          {label}
      </a>
    </div>
  )
}

export const MobileMenu = () => {
  const { pathname } = useLocation()
  const { ref, open, onBtnClick, close } = useHandleMobileMenu()
  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(pathname === '/') return null

  return (
    <div ref={ref} className={`dropdown dropdown-end md:hidden ${ open ? 'dropdown-open' : '' }`}>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={onBtnClick}
        className="btn btn-ghost btn-square text-primary-content bg-transparent border-transparent shadow-none hover:bg-primary/60 hover:shadow-none">
          { open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" /> }
      </button>
      <MenuItems visible={open} onNavigate={close} onLogout={handleLogoutRedirect} />
    </div>
  )
}

type MenuItemsProps = {
  visible: boolean
  onNavigate: () => void
  onLogout: () => void
}

const MenuItems = ({ visible, onNavigate, onLogout }: MenuItemsProps) => {
  const label =
    window.location.host === 'pdapps.franklintn.gov'
      ? 'Back To All PD Apps'
      : 'Back To All FFD Apps'

  if(!visible) return null

  // Nested groups go in as <details className="group"> with a <summary className="uppercase
  // cursor-pointer">, wrapping their <ul> in bg-primary-content text-primary so the sub-level
  // inverts against this menu, and indenting each item with ps-4.
  return (
    <ul className="dropdown-content menu z-50 bg-primary rounded-box w-56 p-2 shadow border border-primary tracking-normal text-primary-content">
      <li>
        <Link to={'/missions'} onClick={onNavigate} className="uppercase">
          Missions
        </Link>
      </li>
      <li>
        <Link to={'/create/mission'} onClick={onNavigate} className="uppercase">
          Create Mission
        </Link>
      </li>
      <li>
        <Link to={'/rosters'} onClick={onNavigate} className="uppercase">
          Manage Rosters
        </Link>
      </li>
      <li>
        <a href="https://franklintn.sharepoint.com/:b:/s/IT-ISDevelopment/IQDUtzFMdk85SpDcGHtGMDrHAaaG7E-EHii5Rx6Mi2eevu4?e=xFt6Kh" target="_blank" rel="noreferrer" onClick={onNavigate} className="uppercase">
          Help
        </a>
      </li>
      <li>
        <a href={'/home'} onClick={onNavigate} className="uppercase">
          {label}
        </a>
      </li>
      <li>
        <button type="button" onClick={onLogout} className="uppercase">
          Logout
        </button>
      </li>
    </ul>
  )
}

const HelpDoc = () => {

  return (
    <a
      href="https://franklintn.sharepoint.com/:b:/s/IT-ISDevelopment/IQDUtzFMdk85SpDcGHtGMDrHAaaG7E-EHii5Rx6Mi2eevu4?e=xFt6Kh"
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none"
      target="_blank">
        Help
    </a>
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
      className={`btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none ${
        active ? 'text-warning' : 'text-neutral-content'
      }`}
    >
      {props.children}
    </Link>
  )
}

const LogoutBtn = () => {
  const activeAccount = useActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none"
    >
      Logout
    </button>
  )
}
