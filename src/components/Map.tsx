import { Box, dividerClasses } from "@mui/material";
import { GameMap } from "../models/Map";
import React from "react";
import { Duo } from "@mui/icons-material";



interface MapComponentProps{
    width: number;
    heigth: number;
}

export default function MapComponent(props:MapComponentProps){

    const [tumadre, setTumadre] = React.useState<string>();

    
    return(
        // <Box sx={{
        //     position: 'relative',
        //     width: props.width,
        //     height: props.heigth, 
        //     top: props.position.x,
        //     left: props.position.y,
            
            
        //     border: '1px solid green'}}>

        // </Box>

        <Box sx={{
            width: 100,
            height: 100,
            display: "flex"
            }}> 
            <>{GameMap.createMap().map(element => {
                return element.map(another => {
                    return <img src={"imgs/"+another}></img>
                })
            })}</>
        </Box>

    )
}