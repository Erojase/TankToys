import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";
import { TankController } from "../controllers/TankController";


interface TankComponentProps{
    width: number;
    heigth: number;
    rotation: number;
    render?: boolean;
    // children: JSX.Element
}

export default function CannonComponent(props:TankComponentProps){

    const [rotation, setRotation] = React.useState(TankController.scopePos);

    React.useEffect(() => {
        setInterval(() => {
            setRotation(TankController.scopePos);
        }, 24);
    }, [])


    return(
        <Box>

            <img src="/tanky-top-1.png"  
            style={{
                position: 'relative',
                zIndex: 55,
                width: props.width,
                height: props.heigth, 
                rotate: `${TankController.cannonRotation}rad`}}
                />
                
        </Box>
    )
}