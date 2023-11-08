import React from "react";
import { Tank } from "../models/Tank";
import { TankController } from "../controllers/TankController";

export default function MainCanvas() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const [render, rerender] = React.useState(false);

    const tank:Tank = new Tank();
    const tankController:TankController = new TankController(tank);
    tankController.triggerComponentRender = () => { rerender(!render) };
    
    React.useEffect(() => {
        let canvas = canvasRef?.current;
        tankController.setMoveEvents(window.document);

        let ctx = canvas?.getContext("2d");

        ctx!.fillStyle = "blue";
        ctx?.fillRect(0, 0, canvas!.width, canvas!.height);

        paintTank(ctx!);
        return () => {}
    }, [render])

    const paintTank = (ctx:CanvasRenderingContext2D) =>{
        ctx.fillStyle = "red";
        console.log(tank);
        ctx.fillRect(tank.position.x, tank.position.y, 10, 10);
    }

    return (
        <canvas style={{height: 500, width: 500}} 
        ref={canvasRef}
        ></canvas>
    )
}