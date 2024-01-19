import {initialState} from "../models/initial-state";
import {AuthActionTypes} from "../constants";
import {clearTokens, setAccessToken, setRefreshToken} from "../token-manager";

export const authReducer = (state = initialState(), action) => {
    switch (action.type) {
        case AuthActionTypes.authorize:
            case AuthActionTypes.refreshAccessToken:
                //console.log("REDUCER: [set tokens]")
                setAccessToken(action.payload.access)
                setRefreshToken(action.payload.refresh)
                return {...state, authorized: true}
        case AuthActionTypes.checkTokenValid:
            if (!action.payload) {
                //console.log("REDUCER: [clear tokens]")
                clearTokens()
            } else {
                //console.log("REDUCER: [tokens are valid]")
            }
            return {...state, authorized: action.payload}
        case AuthActionTypes.loadUserInfo:
            //console.log("REDUCER: [loaded user info and metadata]")
            //console.log(action.payload)
            return {...state, userInfo: action.payload, metadata: action.payload.metadata}
        case AuthActionTypes.loadMetadata:
            //console.log("REDUCER: [loaded user metadata]")
            //console.log(action.payload)
            return {...state, metadata: action.payload}
        case AuthActionTypes.saveMetadata:
            //console.log("REDUCER: [saved metadata]")
            return state
        default: {
            return state
        }
    }
}