export const NODE_ENV = import.meta.env.MODE

export const APP_BASE = "/drone-missions"
export const APP_TITLE = "Drone Missions"

export const API_URL = import.meta.env.DEV ?
  "https://cofasv38.franklin-gov.com/api/v3/pd/drone" :
  "https://pdapps.franklintn.gov/api/v3/pd/drone"

export const MOCK_TOKEN = "dev-token-12345"

export const CLIENT_ID = "ff3cbe5e-f332-4013-8fd5-d2e121c39af9"
export const ENTRA_CLIENT_ID = "6339af9a-1326-4fa3-ad2c-c32af177b4ad"

export const AUTH_AUTHORITY = "https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/"

export const AUTH_REDIRECT_URI_PDAPPS = "https://pdapps.franklintn.gov/drone-missions"
export const AUTH_POST_LOGOUT_REDIRECT_URI_PDAPPS = "https://pdapps.franklintn.gov/"
export const AUTH_REDIRECT_URI_FIREAPPS = "https://fireapps.franklintn.gov/drone-missions"
export const AUTH_POST_LOGOUT_REDIRECT_URI_FIREAPPS = "https://fireapps.franklintn.gov/"
