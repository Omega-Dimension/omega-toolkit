import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <AppBar>
            <Toolbar>
                <IconButton
                color="inherit"
                edge="start"
                sx={{mr:2, display : {sm: "none"}}}
                onClick={onMenuClick}
                >
                    <Menu />    
                </IconButton>

                <Typography variant="h6" noWrap>
                    Helper Hub
                </Typography>
            </Toolbar>
        </AppBar>
    )
}