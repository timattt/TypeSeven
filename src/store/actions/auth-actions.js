import axios from "axios";
import {AuthActionTypes} from "../constants";
import {
    getAccessToken,
    getRefreshToken,
    hasRefreshToken
} from "../token-manager";

const serverUrl = process.env.REACT_APP_TYPE7_SERVER_IP
const clientId = process.env.REACT_APP_TYPE7_CLIENT_ID
const clientSecret = process.env.REACT_APP_TYPE7_CLIENT_SECRET
const redirectUri = process.env.REACT_APP_TYPE7_REDIRECT_URI

axios.defaults.baseURL = serverUrl;

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
        return axios.post('/oauth2/token', payload, {
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

export function checkTokenValid() {
    console.log("Action: [checkTokenValid]")
    return dispatch => {
        let payload = new FormData()
        payload.append('token', getAccessToken())
        return axios.post('/oauth2/introspect', payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(res => {
            if (!res.data.active && hasRefreshToken()) {
                dispatch(refreshAccessToken())
            } else {
                dispatch({type: AuthActionTypes.checkTokenValid, payload: res.data.active})
            }
        }).catch(err => {
            console.log("HTTP request to [/oauth2/introspect] failed with error:" + err)
            dispatch({type: AuthActionTypes.checkTokenValid, payload: false})
        });
    }
}

export function refreshAccessToken() {
    console.log("Action: [refreshAccessToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'refresh_token')
        payload.append('refresh_token', getRefreshToken())
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)
        return axios.post('/oauth2/token', payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(response => {
            dispatch({type: AuthActionTypes.refreshAccessToken, payload: {access: response.data["access_token"], refresh: response.data["refresh_token"]}})
        }).catch(err => {
            console.log("HTTP request to [/oauth2/token] failed with error:" + err)
            dispatch({type: AuthActionTypes.checkTokenValid, payload: false})
        });
    }
}

export function loadUserInfo() {
    console.log("Action: [loadUserInfo]")
    return dispatch => {
        return axios.get('/user-info', {
            headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }}).then(res => {
            dispatch({type: AuthActionTypes.loadUserInfo, payload: res.data})
        }).catch(err => {
            console.log("HTTP request to [/user-info] failed with error:" + err)
        })
    }
}

