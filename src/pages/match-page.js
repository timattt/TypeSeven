import {Box, Card, CardActions, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";
import {loadOtherUser, loadUserInfo} from "../store/actions/user-info-actions";

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
            metadata: state.userInfoReducer.metadata,
            loadedUsers: state.userInfoReducer.loadedUsers
        }
    },
    (dispatch) => {
        return {loadOtherUser: (id) => dispatch(loadOtherUser(id)), loadUserInfo: () => dispatch(loadUserInfo())}
    }
)((props) => {
    
    // Каждую секунду скачиваем данные еще раз - вдруг нам завезли мэтч
    setTimeout(() => {
        props.loadUserInfo()
        if (props.metadata !== undefined) {
            props.metadata.selectedUsers.forEach(id => props.loadOtherUser(id))
        }
    }, 1000)

    let users = []
    if (props.metadata !== undefined) {
        users = props.metadata.selectedUsers.map(id => props.loadedUsers.filter(user => user.id === id).slice(0, 1)).flat(1)
    }

    // IF THERE IS NO USERS LOADED SO SHOW BAD PAGE
    if (users.length === 0) {
        return <NoMatchPane/>
    }

    return <ContentHolder users={users}/>
});

export default MatchPage;