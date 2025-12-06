export const setParams = (department: 'Police' | 'Fire' | 'IT' | undefined) => {
  if(!department) return undefined

  const params = new URLSearchParams()

  params.append('department', String(department))

  return params
}