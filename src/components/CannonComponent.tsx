import { Box } from "@mui/material";
import React from "react";
import { GameController } from "../controllers/GameController";
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

    const cannonRotation = () => setRotation(TankController.scopePos);

    React.useEffect(() => {
        GameController.addToGameLoop(cannonRotation)
        // setInterval(() => {
        //     setRotation(TankController.scopePos);
        // }, 24);
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