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
    render?: boolean;

}

export default function BulletComponent(props:BulletProps){
    
    const [position, setPosition] = React.useState(TankController.scopePos);


    React.useEffect(() => {
        setInterval(() => {
            setPosition(TankController.scopePos);
            // console.log(BulletController.bullet.position);
            
        }, 24);
    }, [])


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
