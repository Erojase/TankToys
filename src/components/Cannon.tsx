import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";


interface TankComponentProps{
    width: number;
    heigth: number;
    position: Position;
    rotation: number;
}

export default function CannonComponent(props:TankComponentProps){


    React.useEffect(() => {
      
    }, [props])

    return(
        <img src="/tanky-top.png"  
        style={{
            position: 'relative',
            width: props.width,
            height: props.heigth, 
            top: props.position.x,
            left: props.position.y,
            rotate: `${props.rotation}deg`}}
        />

    )
}