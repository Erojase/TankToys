import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";
import { GameController } from "../controllers/GameController";
import { TankController } from "../controllers/TankController";
import { Bullet } from "../models/Bullet";
import { BulletController } from "../controllers/BulletController";


interface BulletProps {
    width: number;
    heigth: number;
    position: Position;
    rotation: number;
}

export default function BulletComponent(props:BulletProps){

    // const [rotation, setRotation] = React.useState(TankController.scopePos);

    // React.useEffect(() => {
    //     setInterval(() => {
    //         setRotation(TankController.scopePos);
    //     }, 24);
    // }, [])


    return(
        <img src="/bullet.png"  
        style={{
            position: 'absolute',
            zIndex: 60,
            width: props.width,
            height: props.heigth, 
            top: props.position.y,
            left: props.position.x,
            rotate: `${BulletController.bullet.rotation}rad`}}
            />
    )
}
