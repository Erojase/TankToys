import React from "react";
import { TankController } from "../controllers/TankController";
import { dimensions } from "../utils/utils";
import { ImgCache } from "../models/Cache";
import { Box } from "@mui/material";
import TankComponent from "./Tank";
import { GameMap } from "../models/Map";

export default function MainCanvas() {
    const [thisWindow, setThisWindow] = React.useState<dimensions>({
        height: 0,
        width: 0
      });
    const ContainerRef = React.useRef(null);

    const [render, rerender] = React.useState(false);

    TankController.triggerComponentRender = () => { rerender(!render) };
    GameMap.createMap();
    
    React.useEffect(() => {
        setThisWindow({
            height: window.innerHeight,
            width: window.innerWidth
        })
        
        keyboardHandler();
        
        
        return () => {}
    }, [render])
    

    const keyboardHandler = () =>{
        document.addEventListener('keydown', (e) => TankController.Move(e), { once: true })
    }

    return (
        <Box style={{border: "1px solid black", height: thisWindow.height, width: thisWindow.width}} 
        ref={ContainerRef}
        >

        <TankComponent
            heigth={100}
            width={100}
            position={TankController.tank.position}
        />

        

        </Box>
    )
}