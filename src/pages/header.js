import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";

export function Header() {
    const navigate = useNavigate();

    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ marginRight: 10 }}>MIPT.match</Typography>
                    <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                    <Button color="inherit" onClick={() => navigate("/match")}>Match</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
                    <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Outlet/>
    </div>
}