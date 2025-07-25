import React, { useContext, useState, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import RostersCtx from "../../context"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { FormType } from "../../context"

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

  return useQuery(['getPerson', formUUID], () => AppActions.getPerson(formUUID, authHeaders(token)), { enabled: enabled && !!token })
}

export const useHandleDeleteBtn = () => {
  const { formUUID, dispatch } = useContext(RostersCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteRosterPersonnel(formUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getRosterPersonnel')
      queryClient.invalidateQueries(['getPerson', formUUID])
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onClick, label: !state.active ? 'Delete Personnel' : 'Confirm Delete' }
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