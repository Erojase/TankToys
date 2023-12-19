import React, { useState } from "react";
import { TankController } from "../controllers/TankController";
import { GameController } from "../controllers/GameController";
import { NONAME } from "dns";


interface ScopeComponentProps{
    width: number;
    heigth: number;
}

export default function ScopeComponent(props:ScopeComponentProps){

    const [position, setPosition] = React.useState(TankController.scopePos);

    const scopePosition = () => setPosition(TankController.scopePos);

    React.useEffect(() => {
        GameController.addToGameLoop(scopePosition)
        console.log("renderizado");
    }, [])



    return(
            <>
            <img src="/mira.png" id="scope"  
            style={{
                position: 'absolute',
                pointerEvents: "none",
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