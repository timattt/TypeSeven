import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useState} from "react";

export default function HomePage() {
    const navigate = useNavigate()
    const [showAbout, setShowAbout] = useState(false)
    const [showContacts, setShowContacts] = useState(false)

    if (!showAbout && showContacts) {
        setShowContacts(false)
    }

    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        MIPT.match
                    </Typography>
                    <Typography variant="h8">
                        - это студенческий open-source-проект, призванный помочь людям из разных ВУЗов познакомится
                        друг с другом.
                        <br/>
                        <br/>
                        Вам достаточно авторизироваться с вашей студенческой почты, чтобы мы смогли задать вам несколько
                        вопросов, а после предложить человека со схожими увлечениями и жизненными интересами.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate("/login")}>Приступить</Button>
                    <Button size="small" onClick={() => setShowAbout(!showAbout)}>О создателях</Button>
                </CardActions>
            </Card>

            {showAbout &&
                <Card>
                    <CardContent>
                        <Typography variant="h6">Создатели</Typography>
                        <Typography variant="h8">
                            Несколько студентов МФТИ, которые недовольны тем, что физтехи страдают от дефицита общения.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => setShowContacts(!showContacts)}>Контакты</Button>
                    </CardActions>
                </Card>
            }

            {showContacts &&
                <Card>
                    <CardContent>
                        <Typography variant="h6">Контакты</Typography>
                        <Typography variant="h8">
                            Какая-нибудь клевая почта тут.
                        </Typography>
                    </CardContent>
                </Card>
            }
    </Box>
}