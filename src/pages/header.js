import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {performLogout} from "../store/actions/auth-actions";

const Header = connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized
        }
    },
    (dispatch) => {
        return {performLogout: () => dispatch(performLogout())}
    }
)((props) => {
    const navigate = useNavigate();

    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate("/")}>MIPT.Match</Button>
                    <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                    <Button color="inherit" onClick={() => navigate("/match")}>Match</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
                    { !props.authorized
                        ? <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                        : <Button color="inherit" onClick={props.performLogout}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
        <Outlet/>
    </div>
})

export default Header;