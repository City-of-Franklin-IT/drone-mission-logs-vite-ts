import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'ff3cbe5e-f332-4013-8fd5-d2e121c39af9',
        authority: 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/',
        redirectUri: 'https://istest.franklintn.gov/drone-missions',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage', 
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
    redirectUri: "https://istest.franklintn.gov/drone-missions"
};