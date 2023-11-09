import React from "react";
import { TankController } from "../controllers/TankController";
import { tank } from "../pages/game";
import { dimensions } from "../utils/utils";

export default function MainCanvas() {
    const [thisWindow, setThisWindow] = React.useState<dimensions>({
        height: 0,
        width: 0
      });
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const [render, rerender] = React.useState(false);

    TankController.triggerComponentRender = () => { rerender(!render) };
    
    React.useEffect(() => {
        setThisWindow({
            height: window.innerHeight,
            width: window.innerWidth
          })
        let canvas = canvasRef?.current;
        TankController.tank = tank;
        let ctx = canvas?.getContext("2d");

        keyboardHandler();


        ctx!.fillStyle = "white";
        ctx?.fillRect(0, 0, canvas!.width, canvas!.height);

        paintTank(ctx!);
        return () => {}
    }, [render])

    const paintTank = (ctx:CanvasRenderingContext2D) =>{
        ctx.fillStyle = "red";
        ctx.fillRect(tank.position.x, tank.position.y, 10, 10);
    }

    const keyboardHandler = () =>{
        document.addEventListener('keydown', (e) => TankController.Move(e), { once: true })
    }

    return (
        <canvas style={{height: thisWindow.height, width: thisWindow.width}} 
        ref={canvasRef}
        ></canvas>
    )
}