import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useState} from "react";

export default function HomePage() {
    const navigate = useNavigate()
    const [showAbout, setShowAbout] = useState(false)
    const [showContacts, setShowContacts] = useState(false)
    const [showApproval, setShowApproval] = useState(false)

    if (!showAbout && showContacts) {
        setShowContacts(false)
    }

    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        MIPT.Match
                    </Typography>
                    <Typography variant="h8">
                        - это студенческий open-source-проект, призванный помочь людям из разных ВУЗов познакомиться
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
                <CardActions>
                    <Button size="small" onClick={() => setShowApproval(!showApproval)}>Согласие об обработке персональных данных</Button>
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
                            <a href="https://t.me/nasyrovTimur">tg</a>
                        </Typography>
                    </CardContent>
                </Card>
            }

        {showApproval &&
            <Card>
                <CardContent>
                    <Typography variant="h6">Согласие об обработке персональных данных</Typography>
                    <Typography variant="h8">
                        Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и
                        использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от
                        27.07.2006 г. в следующих целях:
                        <br/>
                        - Осуществление клиентской поддержки
                        <br/>
                        - Получения Пользователем информации о маркетинговых событиях
                        <br/>
                        - Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых
                        услуг.
                        <br/>
                        <br/>
                        Под персональными данными подразумевается любая информация личного характера, позволяющая
                        установить личность Пользователя/Покупателя такая как:
                        <br/>
                        - Фамилия, Имя, Отчество
                        <br/>
                        - Дата рождения
                        <br/>
                        - Контактный телефон
                        <br/>
                        - Адрес электронной почты
                        <br/>
                        - Почтовый адрес
                        <br/>
                        <br/>
                        Персональные данные Пользователей хранятся исключительно на электронных носителях и
                        обрабатываются с использованием автоматизированных систем, за исключением случаев, когда
                        неавтоматизированная обработка персональных данных необходима в связи с исполнением требований
                        законодательства.
                        <br/>
                        <br/>
                        Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением
                        следующих случаев:
                        <br/>
                        - По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке,
                        установленным законодательством РФ
                        <br/>
                        - Стратегическим партнерам, которые работают с Компанией для предоставления продуктов и услуг,
                        или
                        тем из них, которые помогают Компании реализовывать продукты и услуги потребителям. Мы
                        предоставляем третьим лицам минимальный объем персональных данных, необходимый только для
                        оказания требуемой услуги или проведения необходимой транзакции.
                        <br/>
                        <br/>
                        Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила,
                        при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий
                        настоящих правил вступают в силу после их публикации на Сайте.
                    </Typography>
                </CardContent>
            </Card>
        }
    </Box>
}
