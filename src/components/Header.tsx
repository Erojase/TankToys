import { AppBar, Toolbar, IconButton, Typography, Box, FormControlLabel, FormGroup, Menu, MenuItem, Switch, Tooltip, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { theme } from "../utils/Theme";

interface HeaderProps {
    children: any;
}

export default function Header(props: HeaderProps) {
    const [auth, setAuth] = React.useState(false);
    const [CurrElement, setCurrElement] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setCurrElement(event.currentTarget);
        console.log(CurrElement);

    };

    const handleClose = () => {
        setCurrElement(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TankToys
                        </Typography>
                        {auth ? (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={CurrElement}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(CurrElement)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <>
                                <Button sx={{color: theme.palette.primary.contrastText}} variant="contained">Sign In</Button>
                                <Button sx={{color: theme.palette.primary.contrastText}} variant="contained">Login</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            {props.children}
        </>
    )
}