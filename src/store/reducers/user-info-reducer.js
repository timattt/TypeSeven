import {initialState} from "../models/initial-state";
import {UserInfoActionTypes} from "../constants";
import cloneDeep from 'lodash/cloneDeep';

export const userInfoReducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserInfoActionTypes.loadUserInfo:
            //console.log("REDUCER: [loaded user info and metadata]")
            return {...state, userInfo: action.payload, metadata: action.payload.metadata}
        case UserInfoActionTypes.loadMetadata:
            //console.log("REDUCER: [loaded user metadata]")
            return {...state, metadata: action.payload}
        case UserInfoActionTypes.saveMetadata:
            //console.log("REDUCER: [saved metadata]")
            return {...state}
        case UserInfoActionTypes.changeEntry:
           // console.log("REDUCER: [change entry]")
            const entrySetName = action.payload.entrySetName
            const entryName = action.payload.entryName
            const metadata = cloneDeep(state.metadata)
            metadata.metadataEntrySets.forEach(entrySet => {
                if (entrySet.name === entrySetName) {
                    entrySet.entries.forEach(entry => {
                        if (entry.name === entryName) {
                            entry.flag = !entry.flag
                        }
                    })
                }
            })
            return {...state, metadata: metadata}
        case UserInfoActionTypes.loadOtherUserInfo:
            //console.log("REDUCER: [loaded other user info]")
            return {...state, loadedUsers: [...state.loadedUsers, action.payload]}
        case UserInfoActionTypes.invalidateMetadata:
            //console.log("REDUCER: [invalidated metadata]")
            return {...state, metadata: undefined}
        default: {
            return state
        }
    }
}