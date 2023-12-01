import React from "react";
import { TankController } from "../controllers/TankController";
import { dimensions } from "../utils/utils";
import { BulletController } from "../controllers/BulletController";
import { ImgCache } from "../models/Cache";
import { Box } from "@mui/material";
import TankComponent from "./Tank";
import ScopeComponent from "./Scope";
import { GameMap } from "../models/Map";
import MapComponent from "./Map";
import { GameController } from "../controllers/GameController";
import CannonComponent from "./Cannon";
import BulletComponent from "./Bullet";

export default function MainCanvas() {
    const [thisWindow, setThisWindow] = React.useState<dimensions>({
        height: 0,
        width: 0
    });
    const ContainerRef = React.useRef(null);

    const [render, rerender] = React.useState(false);

    TankController.triggerComponentRender = () => { rerender(!render) };

    React.useEffect(() => {
        GameController.addToGameLoop(TankController.Move);
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
        document.addEventListener('keypress', (e) => TankController.addKey(e.key), { once: true });
        document.addEventListener('keyup', (e) => TankController.removeKey(e.key), { once: true });
        document.addEventListener('mousemove', (e) => TankController.scopePlacement(e), { once: true });
        document.addEventListener("click", (e) => BulletController.shoot(), { once: true })
    }

    return (
        <Box style={{ border: "1px solid black", height: thisWindow.height, width: thisWindow.width }}
            ref={ContainerRef}
        >
            
            <TankComponent
                heigth={100}
                width={100}
                position={TankController.tank.position}
                rotation={TankController.tank.rotation}
            >
                <CannonComponent
                    heigth={50}
                    width={150}
                    rotation={TankController.cannonRotation}
                >
                    <BulletComponent
                    heigth={20}
                    width={30}
                    position={BulletController.bullet.position}
                    rotation={BulletController.bullet.rotation}
                    />
                </CannonComponent>

                

            </TankComponent>


            <ScopeComponent
                heigth={50}
                width={50}

            />

            {/* <MapComponent width={0} heigth={0} /> */}



        </Box>


    )
}