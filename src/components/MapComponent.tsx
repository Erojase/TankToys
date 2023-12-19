import { Box, Button, Grid, List, ListItem, ListItemText, dividerClasses } from "@mui/material";
import { GameMap, MapPosition } from "../models/Map";
import React, { useEffect } from "react";
import { Duo } from "@mui/icons-material";
import { Position } from "../models/Tank";
import { relative } from "path";



interface MapComponentProps {
    width: number;
    heigth: number;
    position: MapPosition;
}



export default function MapComponent(props: MapComponentProps) {

    let posx: number = -25;
    let posy: number = 50;


    const [map, SetMap] = React.useState<any>();

    const generateMap = (random:boolean) => {
        let projectItems = GameMap.createMap(random).map(project => {
            return (
                <div style={{
                    position: 'absolute',
                    top: props.position.y = posy = 50,
                    left: props.position.x = posx += 25
                    // zIndex:0
                }}>
                    {
                        project.map(another => <img height={50} width={50} src={"imgs/" + another} style={{
                            position: 'absolute',
                            top: props.position.y = posy += 50,
                            left: props.position.x = posx
                            // zIndex:0
                        }}></img>)
                    }
                </div>
            )
        });
        SetMap(projectItems);
    }

    React.useEffect(() => {
        generateMap(true);
    }, [])

    return (
        // <Box sx={{
        //     position: 'relative',
        //     width: props.width,
        //     height: props.heigth, 
        //     top: props.position.x,
        //     left: props.position.y,


        //     border: '1px solid green'}}>

        // </Box>
        <>
            <Button
                onClick={() => generateMap(false)}>paco</Button>
            <Box sx={{
                width: 50,
                height: 50,
                display: "flex"
            }}>
                {map}
            </Box>
        </>
    )
}