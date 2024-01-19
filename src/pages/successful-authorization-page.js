import {connect} from "react-redux";
import {loadUserInfoAndMetadata} from "../store/actions/auth-actions";
import {useEffect} from "react";

const SuccessfulAuthorizationPage = (props) => {
    useEffect(() => {
        if (props.userInfo === undefined) {
            props.loadUserInfoAndMetadata()
        }
    })
    return <div>
        <h1>Successful authorization</h1>
        <h2>Welcome, {props.userInfo ? props.userInfo.email : "..."}</h2>
    </div>
}

export default connect(
    (state) => {
        return {
            userInfo: state.authReducer.userInfo,
            metadata: state.authReducer.metadata
        }
    },
    (dispatch) => {
        return {loadUserInfoAndMetadata: () => dispatch(loadUserInfoAndMetadata())}
    }
)(SuccessfulAuthorizationPage);