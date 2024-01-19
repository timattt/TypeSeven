import axios from "axios";
import {AuthActionTypes, clientId, clientSecret, metadataServerUrl, redirectUri, serverUrl} from "../constants";
import {
    getAccessToken,
    getRefreshToken,
    hasRefreshToken
} from "../token-manager";
import {loadUserInfo} from "./user-info-actions";

function generateClientAuthPayload() {
    return 'Basic ' + btoa(clientId + ":" + clientSecret)
}

export function performAuthorization() {
    console.log(serverUrl)
    console.log("Action: [performAuthorization]")
    return dispatch => {
        window.location.replace(`${serverUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`)
    }
}

export function exchangeCodeToToken(code) {
    console.log("Action: [exchangeCodeToToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)
        return axios.post(serverUrl + '/oauth2/token', payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': generateClientAuthPayload()
                }
            }
        ).then(response => {
            dispatch({type: AuthActionTypes.authorize, payload: {access: response.data["access_token"], refresh: response.data["refresh_token"]}})
        }).catch(err => {
            console.log("HTTP request to [/oauth2/token] failed with error:" + err)
        })
    }
}

/**
 * Used only in private-route
 * @returns {function(*): Promise<void>}
 */
// TODO remove this
export function checkTokenValid() {
    console.log("Action: [checkTokenValid]")
    return dispatch => {
        let payload = new FormData()
        payload.append('token', getAccessToken())
        return axios.get(metadataServerUrl + '/check', {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }}).then(res => {
                dispatch({type: AuthActionTypes.checkTokenValid, payload: true})
        }).catch(err => {
            console.log("HTTP request to [/check] failed with error:" + err)
            if (hasRefreshToken()) {
                dispatch(refreshAccessToken())
            } else {
                dispatch({type: AuthActionTypes.checkTokenValid, payload: false})
            }
        });
    }
}

export function introspectToken() {
    console.log("Action: [introspectToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('token', getAccessToken())
        return axios.post(serverUrl + '/oauth2/introspect', payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(res => {
            dispatch({type: AuthActionTypes.checkTokenValid, payload: true})
        }).catch(err => {
            console.log("HTTP request to [/oauth2/introspect] failed with error:" + err)
            dispatch({type: AuthActionTypes.checkTokenValid, payload: false})
        });
    }
}

/**
 * Used as chain from this file
 * @returns {function(*): Promise<void>}
 */
export function refreshAccessToken() {
    console.log("Action: [refreshAccessToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'refresh_token')
        payload.append('refresh_token', getRefreshToken())
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)
        return axios.post(serverUrl + '/oauth2/token', payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(response => {
            dispatch({type: AuthActionTypes.refreshAccessToken, payload: {access: response.data["access_token"], refresh: response.data["refresh_token"]}})
            dispatch(loadUserInfo())
        }).catch(err => {
            console.log("HTTP request to [/oauth2/token] failed with error:" + err)
            dispatch({type: AuthActionTypes.checkTokenValid, payload: false})
        });
    }
}
