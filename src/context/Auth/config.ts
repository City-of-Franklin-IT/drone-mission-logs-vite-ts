import { LogLevel, AccountInfo } from '@azure/msal-browser'
import { CLIENT_ID, AUTH_AUTHORITY, ENTRA_CLIENT_ID, AUTH_REDIRECT_URI_PDAPPS, AUTH_POST_LOGOUT_REDIRECT_URI_PDAPPS, AUTH_REDIRECT_URI_FIREAPPS, AUTH_POST_LOGOUT_REDIRECT_URI_FIREAPPS } from '@/config'

export const setAuth = () => {
    const auth = {
        clientId: CLIENT_ID,
        authority: AUTH_AUTHORITY,
        redirectUri: '',
        postLogoutRedirectUri: '',
        navigateToLoginRequestUrl: true,
        allowRedirectInIframe: true
    }

    if(window.location.host === 'pdapps.franklintn.gov') {
        auth.redirectUri = AUTH_REDIRECT_URI_PDAPPS
        auth.postLogoutRedirectUri = AUTH_POST_LOGOUT_REDIRECT_URI_PDAPPS
    } else {
        auth.redirectUri = AUTH_REDIRECT_URI_FIREAPPS
        auth.postLogoutRedirectUri = AUTH_POST_LOGOUT_REDIRECT_URI_FIREAPPS
    }

    return auth
}

const auth = setAuth()

export const msalConfig = {
    auth,
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if(containsPii) {
                    return
                }
                switch(level) {
                    case LogLevel.Error:
                        console.error(message)
                        return
                    case LogLevel.Verbose:
                        console.debug(message)
                        return
                    case LogLevel.Warning:
                        console.warn(message)
                        return
                    default:
                        return
                }
            },
        },
    },
}

export const loginRequest = {
    scopes: ["openid", "profile"],
    redirectUri: auth.redirectUri
}

export const acquireRequest = (account: AccountInfo) => ({
    scopes: [`${ ENTRA_CLIENT_ID }/.default`],
    account
})
