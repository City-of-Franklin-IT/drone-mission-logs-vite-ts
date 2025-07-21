export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const formatDate = (date: string) => { // Format dates for react hook form
  
  return new Date(date).toISOString().split('T')[0]
}