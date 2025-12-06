// Types
import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser"

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

export const getUserDepartment = async (instance: IPublicClientApplication, activeAccount: AccountInfo) => {
  const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me?$select=department',
    scopes: ['User.Read'] 
  }

  const accessTokenRequest = {
    scopes: graphConfig.scopes,
    account: activeAccount
  }

  const result = await instance.acquireTokenSilent(accessTokenRequest)
  
  const accessToken = result.accessToken

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${ accessToken }`)

  const response = await fetch(graphConfig.graphMeEndpoint, { headers })
  
  const data = await response.json()

  return data.department
}