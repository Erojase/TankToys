import React from "react";
import { GameController } from "../controllers/GameController";
import { BulletController } from "../controllers/BulletController";
import { TankController } from "../controllers/TankController";


interface BulletProps {
    width: number;
    heigth: number;
}

export default function BulletComponent(props:BulletProps){
    
    const [position, setPosition] = React.useState(BulletController.bullet.position);

    const [render, triggerRender] = React.useState(false);

    BulletController.triggerComponentRender = ()=>{triggerRender(!render)}

    const bulletPosition = () => setPosition(BulletController.bullet.position)

    React.useEffect(() => {
        GameController.addToGameLoop(bulletPosition);
        // setInterval(()=>{
        //     bulletPosition
        // }, 24)
        console.log("renderizado");
    }, [])


    return(<>
        <img src="/bullet.png"
        style={{
            position: 'absolute',
            zIndex: 60,
            width: props.width,
            height: props.heigth, 
            top: position.y,
            left: position.x,
            rotate: `${BulletController.bullet.rotation}rad`}}
            />
            {`jamon X: ${position.x} jamon y: ${position.y}`}</>
    )
}
