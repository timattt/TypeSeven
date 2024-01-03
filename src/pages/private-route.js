import {Navigate, Outlet} from "react-router-dom";
import {connect} from "react-redux";
import {checkTokenValid} from "../store/actions/auth-actions";

const PrivateRoutes = (props) => {
    props.checkTokenValid()
    return(
        props.authorized ? <Outlet/> : <Navigate to="/unauthorized"/>
    )
}

export default connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized
        }
    },
(dispatch) => {
    return {checkTokenValid: () => dispatch(checkTokenValid())}
    }
)(PrivateRoutes);