import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";


interface ScopeComponentProps{
    width: number;
    heigth: number;
    position: Position;
}

export default function TankComponent(props:ScopeComponentProps){


    React.useEffect(() => {
      
    }, [props])

    return(


            <img src="/mira.png"  
            style={{
                position: 'absolute',
                width: props.width,
                height: props.heigth, 
                top: props.position.y - (props.width /2),
                left: props.position.x - (props.heigth /2)}}
            />

    )
}