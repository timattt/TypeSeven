export const AuthActionTypes = {
    authorize: "AUTHORIZE",
    checkTokenValid: "CHECK_TOKEN_VALID",
    refreshAccessToken: "REFRESH_ACCESS_TOKEN",
}

export const UserInfoActionTypes = {
    loadUserInfo: "LOAD_USER_INFO",
    loadMetadata: "LOAD_META_DATA",
    saveMetadata: "SAVE_METADATA",
    changeEntry: "CHANGE_ENTRY",
    loadOtherUserInfo: "LOAD_OTHER_USER",
    invalidateMetadata: "INVALIDATE_METADATA"
}

export const serverUrl = process.env.REACT_APP_TYPE7_SERVER_IP
export const metadataServerUrl = process.env.REACT_APP_TYPE7_METADATA_SERVER_IP
export const clientId = process.env.REACT_APP_TYPE7_CLIENT_ID
export const clientSecret = process.env.REACT_APP_TYPE7_CLIENT_SECRET
export const redirectUri = process.env.REACT_APP_TYPE7_REDIRECT_URI