import React, { useContext } from 'react'
import RostersCtx from '../../context'
import { useGetPersonnel, useHandleDeleteBtn } from './hooks'

// Components
import HandleLoading from "@/utils/HandleLoading"
import UpdateRosterPersonnelForm from '../../forms/update/UpdateRosterPersonnelForm'
import CreateRosterPersonnelForm from '../../forms/create/CreateRosterPersonnelForm'

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h2 className="text-4xl text-neutral-content font-[play] text-center">{children}</h2>
  )
}

type CreateBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

export const CreateBtn = (props: CreateBtnProps) => {

  return (
    <button 
      type="button"
      className="btn btn-sm btn-accent font-[play] uppercase shadow-xl"
      onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => {
  const { formUUID, formType } = useContext(RostersCtx)

  const { onClick, label } = useHandleDeleteBtn()

  if(formType !== 'personnel') return

  if(!formUUID) return ( // Create new
    <div ref={formRef} className="w-full">
      <CreateRosterPersonnelForm />
    </div>
  )

  return ( // Update existing
    <div ref={formRef} className="flex flex-col gap-4 w-full">
      <GetPersonnel />
      <DeleteBtn 
        onClick={onClick}
        size={'btn-sm'}>
          {label}
      </DeleteBtn>
    </div>
  )
}

type DeleteBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, size: 'btn-sm' | 'btn-lg', children: React.ReactNode }

export const DeleteBtn = (props: DeleteBtnProps) => {

  return (
    <button 
      type="button"
      className={`btn btn-error btn-dash w-full font-[play] uppercase ${ props.size }`}
      onClick={props.onClick}>
        {props.children}
    </button>
  )
}

const GetPersonnel = () => {
  const { data, isSuccess } = useGetPersonnel()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <UpdateRosterPersonnelForm personnel={data?.data} />
    </HandleLoading>
  )
}