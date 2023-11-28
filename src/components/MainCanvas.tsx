import React from "react";
import { TankController } from "../controllers/TankController";
import { dimensions } from "../utils/utils";
import { ImgCache } from "../models/Cache";
import { Box } from "@mui/material";
import TankComponent from "./Tank";
import { GameController } from "../controllers/GameController";

export default function MainCanvas() {
    const [thisWindow, setThisWindow] = React.useState<dimensions>({
        height: 0,
        width: 0
      });
    const ContainerRef = React.useRef(null);

    React.useEffect(() => {
        setThisWindow({
            height: window.innerHeight,
            width: window.innerWidth
        })
    
      return () => {
      }
    }, [])
    

    return (
        <Box style={{border: "1px solid black", height: thisWindow.height, width: thisWindow.width}} 
        ref={ContainerRef}
        >
        <TankComponent
            heigth={100}
            width={100}
            position={TankController.tank.position}
            rotation={TankController.tank.rotation}
        />
        </Box>
    )
}