import {initialState} from "../models/initial-state";
import {UserInfoActionTypes} from "../constants";
import cloneDeep from 'lodash/cloneDeep';

export const userInfoReducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserInfoActionTypes.loadAll:
            //console.log("REDUCER: [loaded user info and metadata]")
            return {...state, userInfo: action.payload.user, metadata: action.payload.metadata}
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
        case UserInfoActionTypes.saveBio:
            return {...state, userInfo: {...state.userInfo, biography: action.payload}}
        default: {
            return state
        }
    }
}