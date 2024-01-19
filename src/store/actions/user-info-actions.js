import axios from "axios";
import {getAccessToken} from "../token-manager";
import {metadataServerUrl, UserInfoActionTypes} from "../constants";

/**
 * Used in: private-route, refresh-token, match-page
 * @returns {function(*): Promise<void>}
 */
export function loadUserInfo() {
    console.log("Action: [loadUserInfo]")
    return dispatch => {
        return axios.get(metadataServerUrl + '/user-info', {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }}).then(res => {
            dispatch({type: UserInfoActionTypes.loadUserInfo, payload: res.data})
        }).catch(err => {
            console.log("HTTP request to [/user-info] failed with error:" + err)
        })
    }
}

export function loadMetadata() {
    console.log("Action: [loadMetadata]")
    return dispatch => {
        return axios.get(metadataServerUrl + '/get', {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }}).then(res => {
            dispatch({type: UserInfoActionTypes.loadMetadata, payload: res.data})
        }).catch(err => {
            console.log("HTTP request to [/get] failed with error:" + err)
        })
    }
}

/**
 * Used only in match-page
 * @param id
 * @returns {function(*): Promise<void>}
 */
export function loadOtherUser(id) {
    console.log("Action: [loadOtherUser]")
    return dispatch => {
        return axios.get(metadataServerUrl + '/user-info/' + id, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }}).then(res => {
            dispatch({type: UserInfoActionTypes.loadOtherUserInfo, payload: res.data})
        }).catch(err => {
            console.log("HTTP request to [/user-info/ID] failed with error:" + err)
        })
    }
}

/**
 * Used in profile-page
 * @param metadata
 * @returns {function(*): Promise<void>}
 */
export function saveMetadata(metadata) {
    console.log("Action: [saveMetadata]")
    return dispatch => {
        return axios.post(metadataServerUrl + '/set', metadata, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/json'
            }}).then(res => {
            dispatch({type: UserInfoActionTypes.saveMetadata, payload: metadata})
        }).catch(err => {
            console.log("HTTP request to [/set] failed with error:" + err)
        })
    }
}

/**
 * Used in profile page
 * @param entrySetName
 * @param entryName
 * @returns {{payload: {entryName, entrySetName}, type: string}}
 */
export function changeEntry(entrySetName, entryName) {
    console.log("Action: [changeEntry]")
    return {type: UserInfoActionTypes.changeEntry, payload: {entrySetName: entrySetName, entryName: entryName}}
}