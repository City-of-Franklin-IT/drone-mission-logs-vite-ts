import React, { useContext, useState, useEffect, useRef } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "../../context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { FormType } from "../../context"

export const useHandlePersonnelContainer = () => {
  const topRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const onCreateBtnClick = useOnCreateBtnClick('personnel')

  return { refs: { topRef, formRef }, onCreateBtnClick }
}

export const useOnCreateBtnClick = (formType: FormType) => {
  const { dispatch } = useContext(RostersCtx)

  return () => {
    dispatch({ type: 'SET_FORM_UUID', payload: '' })
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
  }
}

export const useGetPersonnel = () => {
  const { formUUID } = useContext(RostersCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({ 
    queryKey: ['getPerson', formUUID], 
    queryFn: () => AppActions.getPerson(formUUID, authHeaders(token)), 
    enabled: enabled && !!token 
  })
}

export const useHandleForm = () => {
  const { formUUID, formType, dispatch } = useContext(RostersCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onDeleteBtnClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteRosterPersonnel(formUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
      queryClient.invalidateQueries({ queryKey: ['getPerson', formUUID] })
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  const deleteBtnLabel = !state.active ? 'Delete Personnel' : 'Confirm Delete'

  return { onDeleteBtnClick, deleteBtnLabel, formUUID, formType }
}

export const useScrollToFormRef = (refs: { topRef: React.RefObject<HTMLDivElement>, formRef: React.RefObject<HTMLDivElement> }, target: FormType): void => {
  const { formType } = useContext(RostersCtx)

  const active = formType === target

  useEffect(() => { // Scroll to form if active
    if(active && refs.formRef.current) {
      refs.formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    if(active && refs.topRef.current) {
      refs.topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }, [active, refs])
}