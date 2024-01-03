import {connect} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";

const LoginPage = (props) => {
    return <div>
        <h1>Login</h1>
        <button onClick={props.performAuthorization}>Login</button>
    </div>
}

export default connect(
    (state) => {
        return {
            authResult: state.authReducer.authResult
        }
    },
    (dispatch) => {
        return {performAuthorization: () => dispatch(performAuthorization())}
    }
)(LoginPage);