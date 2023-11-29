import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React, { useState } from "react";
import { TankController } from "../controllers/TankController";


interface ScopeComponentProps{
    width: number;
    heigth: number;
}

export default function ScopeComponent(props:ScopeComponentProps){

    // TODO: El scope no se mueve por el trggercomonentrerender que ya no esta en mainCanvas

    const [position, setPosition] = React.useState(TankController.scopePos);



    React.useEffect(() => {
        setInterval(() => {
            setPosition(TankController.scopePos);
        }, 24);
    }, [])

    // React.useEffect(() => {
    //     console.log("hamaica");
        
    //     return (()=>{})
    // }, [position])

    return(
            <>
            <img src="/mira.png"  
            style={{
                position: 'absolute',
                zIndex: 100,
                width: props.width,
                height: props.heigth, 
                top: position.y - (props.width /2),
                left: position.x - (props.heigth /2)}}
                />

                {`Scope${TankController.scopePos.x}, ${TankController.scopePos.y}`}<br/>
                {`Tanke${TankController.tank.position.x}, ${TankController.tank.position.y}`}<br/>
                {`Cannon ${TankController.cannonRotation} grados`}
                </>
    )
}