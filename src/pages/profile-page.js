import {Box, Button, ButtonGroup, Card, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";
import {changeEntry, saveMetadata} from "../store/actions/user-info-actions";
import {useNavigate} from "react-router-dom";

const EntrySetCard = connect(
    (state) => {
        return {
            metadata: state.userInfoReducer.metadata
        }
    },
    (dispatch) => {
        return {changeEntry: (entrySetName, entryName) => dispatch(changeEntry(entrySetName, entryName))}
    }
)((props) => {
    return  <CardContent sx={{textAlign: "center"}}>
        <Typography variant="h6">
            {props.entrySet.name}
        </Typography>
        <br/>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Box
                justifyContent="center"
                alignItems="center">
                {props.entrySet.entries.map(entry => <Button sx={{margin: 1, backgroundColor: entry.flag ? "green" : "lightBlue"}} key={"button" + entry.name} onClick={() => {
                    // если пользователь что-то изменил - меняем поле в сторе
                    props.changeEntry(props.entrySet.name, entry.name)
                }}>{entry.name}</Button>)}
            </Box>
        </ButtonGroup>
    </CardContent>
});

const ContentHolder = (props) => {
    return <div>
        {props.metadata !== undefined && props.metadata.metadataEntrySets.map(entrySet =>
            <div key={"div" + entrySet.name}>
                <EntrySetCard
                    key={"card" + entrySet.name} entrySet={entrySet}/>
                <br key={"key" + entrySet.name}/>
            </div>)
        }
    </div>
}

const ProfilePage = (props) => {
    const navigate = useNavigate()
    return <Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
        <br/>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Заполните информацию о себе.
                </Typography>
            </CardContent>
        </Card>
        <br/>
        <ContentHolder metadata={props.metadata}/>
        <Card >
            <Button key="resultButton" size="small" onClick={() => {
                // если пользователь нажал кнопку - отправляем данные на сервер и переходим на страницу мэтча
                props.saveMetadata(props.metadata)
                navigate("/match")
            }}>Отправить</Button>
        </Card>
    </Box>
}

export default connect(
    (state) => {
        return {
            metadata: state.userInfoReducer.metadata
        }
    },
    (dispatch) => {
        return {saveMetadata: (metadata) => dispatch(saveMetadata(metadata))}
    }
)(ProfilePage);