import {Box, Card, CardActions, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";
import {loadAll} from "../store/actions/user-info-actions";
import {useEffect} from "react";

const NoMatchPane = () => {
    return <Box>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Мы еще не подобрали вам подходящего по интересам человека.
                </Typography>
                <Typography variant="h8">
                    Пожалуйста, подождите немного.
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    </Box>
}

const UserCard = (props) => {
    return <Card>
        <CardContent>
            <Typography variant="h6">
                {props.user.firstName} {props.user.lastName}
            </Typography>
            <Typography variant="h8">
                {props.user.email}
            </Typography>
            <br/>
            <br/>
            <Typography variant="h8">
                {props.user.biography}
            </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
    </Card>
}

const ContentHolder = (props) => {
    return <Box>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Исходя из ваших интересов, вам подходит:
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        {props.users.map(user => <UserCard key={user} user={user}/>)}
    </Box>
}

const MatchPage = connect(
    (state) => {
        return {
            metadata: state.userInfoReducer.metadata
        }
    },
    (dispatch) => {
        return {loadAll: () => dispatch(loadAll())}
    }
)((props) => {

    // Каждую секунду скачиваем данные еще раз - вдруг нам завезли мэтч
    const timeoutId = setTimeout(() => {
        props.loadAll()
    }, 1000)
    useEffect(() => () => {
        clearTimeout(timeoutId)
    });

    let users = []
    if (props.metadata !== undefined) {
        users = props.metadata.selectedUsers
    }

    // IF THERE IS NO USERS LOADED SO SHOW BAD PAGE
    if (users.length === 0) {
        return <NoMatchPane/>
    }

    return <ContentHolder users={users}/>
});

export default MatchPage;