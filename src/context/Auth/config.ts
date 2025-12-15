import { LogLevel } from '@azure/msal-browser'
import { CLIENT_ID } from '@/config'

export const setAuth = () => {
    const auth = {
        clientId: CLIENT_ID,
        authority: 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/',
        redirectUri: '',
        postLogoutRedirectUri: '',
        navigateToLoginRequestUrl: true,
        allowRedirectInIframe: true
    }

    if(window.location.host === 'pdapps.franklintn.gov') {
        auth.redirectUri = 'https://pdapps.franklintn.gov/drone-missions'
        auth.postLogoutRedirectUri = 'https://pdapps.franklintn.gov/'
    } else {
        auth.redirectUri = 'https://fireapps.franklintn.gov/drone-missions'
        auth.postLogoutRedirectUri = 'https://fireapps.franklintn.gov/'
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
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["openid", "profile"],
    redirectUri: auth.redirectUri
};