import { Box } from "@mui/material";
import React from "react";
import { BulletController } from "../controllers/BulletController";
import { GameController } from "../controllers/GameController";
import { TankController } from "../controllers/TankController";
import { dimensions } from "../utils/utils";
import CannonComponent from "./CannonComponent";
import ScopeComponent from "./ScopeComponent";
import TankComponent from "./TankComponent";
import BulletComponent from "./BulletComponent";
import MapComponent from "./MapComponent";
import { GameMap } from "../models/Map";

export default function MainCanvas() {
    const [thisWindow, setThisWindow] = React.useState<dimensions>({
        height: 0,
        width: 0
    });
    const ContainerRef = React.useRef(null);

    const [render, rerender] = React.useState(false);

    TankController.triggerComponentRender = () => { rerender(!render) };

    React.useEffect(() => {
        GameController.addToGameLoop(keyboardHandler);
    }, [])

    React.useEffect(() => {
        setThisWindow({
            height: window.innerHeight,
            width: window.innerWidth
        })

        return () => { }
    }, [render])


    const keyboardHandler = () => {
        document.addEventListener('mousemove', (e) => TankController.scopePlacement(e), { once: true });
        document.addEventListener("click", (e) => BulletController.shoot(), { once: true })
    }

    return (
        <Box style={{ border: "1px solid black", height: thisWindow.height, width: thisWindow.width }}
            ref={ContainerRef}
        >
            <MapComponent width={10} heigth={10} position={GameMap.position} />

            <TankComponent
                key={"MainTank"}
                heigth={45}
                width={45}
                position={TankController.tank.position}
                rotation={TankController.tank.rotation}
            >
                <CannonComponent
                    heigth={22.5}
                    width={67.5}
                    rotation={TankController.cannonRotation}
                />

            </TankComponent>

            <BulletComponent
                heigth={20}
                width={30}
            />

            <ScopeComponent
                heigth={50}
                width={50}

            />




        </Box>


    )
}