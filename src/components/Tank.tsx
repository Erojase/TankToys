import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";


interface TankComponentProps{
    width: number;
    heigth: number;
    position: Position;
}

export default function TankComponent(props:TankComponentProps){


    React.useEffect(() => {
      
    }, [props])
    

    return(
        <Box sx={{
            position: 'relative',
            width: props.width,
            height: props.heigth, 
            top: props.position.x,
            left: props.position.y,
            
            
            border: '1px solid green'}}>

        </Box>
    )
}