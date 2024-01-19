import {Navigate, Outlet, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {checkTokenValid} from "../store/actions/auth-actions";
import {useEffect} from "react";
import {loadUserInfo} from "../store/actions/user-info-actions";

const PrivateRoutes = (props) => {
    // каждый раз, когда пользователь переключает страничку - проверяем токен
    const location = useLocation()
    useEffect(() => {
        props.checkTokenValid()
    }, [location])

    // Если пользователь только авторизировался - скачиваем данные
    useEffect(() => {
        if (props.authorized && props.userInfo === undefined) {
            props.loadUserInfo()
        }
    })
    return (props.authorized ? <Outlet/> : <Navigate to="/unauthorized"/>)
}

export default connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized,
            userInfo: state.userInfoReducer.userInfo
        }
    },
(dispatch) => {
    return {checkTokenValid: () => dispatch(checkTokenValid()), loadUserInfo: () => dispatch(loadUserInfo())}
    }
)(PrivateRoutes);