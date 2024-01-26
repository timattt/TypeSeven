import {Box, Button, ButtonGroup, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {connect} from "react-redux";
import {changeEntry, saveBio, saveMetadata} from "../store/actions/user-info-actions";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function countActiveEntries(entrySet) {
    return entrySet.entries.filter(entry => entry.flag).length
}

function ensureValidationIsCorrect(entrySet, changeEntry, wantToSet) {
    if (wantToSet) {
        let toUnset = countActiveEntries(entrySet) + 1 - entrySet.maximumChoices

        for (let i = 0; i < entrySet.entries.length && toUnset > 0; i++) {
            if (entrySet.entries[i].flag) {
                changeEntry(entrySet.name, entrySet.entries[i].name)
                toUnset--;
            }
        }
    } else {
        let toSet = entrySet.minimumChoices - countActiveEntries(entrySet) + 1

        for (let i = 0; i < entrySet.entries.length && toSet > 0; i++) {
            if (!entrySet.entries[i].flag) {
                changeEntry(entrySet.name, entrySet.entries[i].name)
                toSet--;
            }
        }
    }
}

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
            {props.entrySet.message}
        </Typography>
        <br/>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Box
                justifyContent="center"
                alignItems="center">
                {props.entrySet.entries.map(entry =>
                    <Button sx={{margin: 1, backgroundColor: entry.flag ? "green" : "lightBlue"}}
                            key={"button" + entry.name}
                            onClick={() => {
                                ensureValidationIsCorrect(props.entrySet, props.changeEntry, !entry.flag)
                                // если пользователь что-то изменил - меняем поле в сторе
                                props.changeEntry(props.entrySet.name, entry.name)
                            }}
                    >{entry.message}</Button>)
                }
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
    const [bio, setBio] = useState("")

    useEffect(() => {
        if (props.userInfo !== undefined) {
            setBio(props.userInfo.biography)
        }
    }, [props.userInfo]);

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
        <Card cx={{margin: "10"}}>
            <CardContent>
                <Box justifyContent="center" alignItems="center">
                    <Typography variant="h6">
                        Напишите что-нибудь о себе
                    </Typography>
                    <Typography variant="h7">
                        И обязательно оставьте ссылку на телегу,
                        чтобы с вами можно было связаться
                    </Typography>
                    <br/>
                    <br/>
                    <TextField multiline fullWidth id="outlined-basic" value={bio} variant="outlined"
                               onChange={(event) => {
                                   setBio(event.target.value)
                               }}/>
                </Box>
            </CardContent>
        </Card>
        <br/>
        <ContentHolder metadata={props.metadata}/>
        <Card>
            <Button key="resultButton" size="small" onClick={() => {
                // если пользователь нажал кнопку - отправляем данные на сервер и переходим на страницу мэтча
                props.saveMetadata(props.metadata)
                props.saveBio(bio)
                navigate("/match")
            }}>Отправить</Button>
        </Card>
        <br/>
        <br/>
        <br/>
    </Box>
}

export default connect(
    (state) => {
        return {
            metadata: state.userInfoReducer.metadata,
            userInfo: state.userInfoReducer.userInfo
        }
    },
    (dispatch) => {
        return {saveMetadata: (metadata) => dispatch(saveMetadata(metadata)), saveBio: (bio) => dispatch(saveBio(bio))}
    }
)(ProfilePage);