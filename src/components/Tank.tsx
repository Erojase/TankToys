import { Box } from "@mui/material";
import { Position } from "../models/Tank";
import React from "react";
import { GameController } from "../controllers/GameController";
import { TankController } from "../controllers/TankController";


interface TankComponentProps{
    width: number;
    heigth: number;
    position: Position;
    rotation: number;
}

export default function TankComponent(props:TankComponentProps){

    const [render, rerender] = React.useState(false);

    TankController.triggerComponentRender = () => { rerender(!render) };
    
      React.useEffect(()=>{
        GameController.addToGameLoop(TankController.Move);
        GameController.addToGameLoop(keyboardHandler);
      }, [])

    React.useEffect(() => {
        
        return () => {}
    }, [render])
    

    const keyboardHandler = () =>{
        document.addEventListener('keypress', (e) => TankController.addKey(e.key), { once: true });
        document.addEventListener('keyup', (e) => TankController.removeKey(e.key), { once: true });
    }
    React.useEffect(() => {
      
    }, [props])

    return(
        <Box sx={{
            position: 'relative',
            width: props.width,
            height: props.heigth, 
            top: props.position.x,
            left: props.position.y,
            rotate: `${props.rotation}deg`,
            
            border: '1px solid green'}}>

        </Box>
    )
}