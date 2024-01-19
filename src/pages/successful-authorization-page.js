import {connect} from "react-redux";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SuccessfulAuthorizationPage = (props) => {
    const navigate = useNavigate()
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Добро пожаловать, {props.userInfo ? props.userInfo.email : "..."}!
                    </Typography>
                    <Typography variant="h8">
                        Вы успешно авторизировались, теперь заполните, пожалуйста, о себе анкету, и после вам будут доступны близкие по интересам люди.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate("/profile")}>Заполнить анкету</Button>
                </CardActions>
            </Card>
    </Box>
}

export default connect(
    (state) => {
        return {
            userInfo: state.userInfoReducer.userInfo
        }
    },
    (dispatch) => {
        return {}
    }
)(SuccessfulAuthorizationPage);