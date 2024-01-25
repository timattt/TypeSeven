import axios from "axios";
import {getAccessToken, hasRefreshToken} from "../token-manager";
import {AuthActionTypes, metadataServerUrl, UserInfoActionTypes} from "../constants";
import {refreshAccessToken} from "./auth-actions";

/**
 * Used in: private-route, refresh-token, match-page
 * @returns {function(*): Promise<void>}
 */
export function loadAll() {
    console.log("Action: [loadAll]")
    return dispatch => {
        return axios.get(metadataServerUrl + '/get', {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }})
            .then(res => {
                dispatch({type: AuthActionTypes.updateTokenState, payload: true})
                dispatch({type: UserInfoActionTypes.loadAll, payload: res.data})
            }).catch(err => {
                console.log("HTTP request to [/get] failed with error:" + err)
                if (hasRefreshToken()) {
                    dispatch(refreshAccessToken())
                } else {
                    dispatch({type: AuthActionTypes.updateTokenState, payload: false})
                }
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

export function saveBio(bio) {
    console.log("Action: [saveBio]")
    return dispatch => {
        return axios.post(metadataServerUrl + '/set/bio', {bio: bio}, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/json'
            }}).then(() => {
                dispatch({type: UserInfoActionTypes.saveBio, payload: bio})
            }).catch(err => {
                console.log("HTTP request to [/set/bio] failed with error:" + err)
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