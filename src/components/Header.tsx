import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";


interface HeaderProps {
    usuario: string;
}

export default function Header(props: HeaderProps) {


    return (
        <>
            Buenas tardes {props.usuario}
        </>
    )
}