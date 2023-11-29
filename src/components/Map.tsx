import { Box, Button, Grid, List, ListItem, ListItemText, dividerClasses } from "@mui/material";
import { GameMap } from "../models/Map";
import React from "react";
import { Duo } from "@mui/icons-material";



interface MapComponentProps {
    width: number;
    heigth: number;
}



export default function MapComponent(props: MapComponentProps) {

    const projectItems = GameMap.createMap().map(project => {
        return (
            <div>
                {
                    project.map(another => <img src={"imgs/" + another}></img>)
                }
            </div>
        )
    });

    return (
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
            {projectItems}
        </Box>

    )
}