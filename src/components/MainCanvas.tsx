import React from "react";
import { TankController } from "../controllers/TankController";
import { tank } from "../pages/game";
import { dimensions } from "../utils/utils";
import { BulletController } from "../controllers/BulletController";
import { ImgCache } from "../models/Cache";

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
        ctx!.canvas.height = window.innerHeight; //or your desired height 
        ctx!.canvas.width = window.innerWidth
        
        keyboardHandler();
        
        
        ctx!.fillStyle = "white";
        ctx?.fillRect(0, 0, canvas!.width, canvas!.height);
        
        paintTank(ctx!);
        return () => {}
    }, [render])
    
    const paintTank = (ctx:CanvasRenderingContext2D) =>{
        if (ImgCache.tanky == undefined) {
            let img = new Image();
            img.onload = () =>{
                ctx.imageSmoothingEnabled = false;
                
                ctx.save();
                ctx.rotate(TankController.tank.rotation);                
                ctx.drawImage(img, 0, 0, img.width, img.height, tank.position.x, tank.position.y, 100, 100);
                ctx.restore();
            }
            img.src = "/tanky-bot.png"
            ImgCache.tanky = img;
        } else {
            ctx.imageSmoothingEnabled = false;
            
            ctx.save();
            ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
            ctx.rotate(TankController.tank.rotation*Math.PI/180);     
      
            ctx.drawImage(ImgCache.tanky, 0, 0, ImgCache.tanky.width,ImgCache.tanky.height, tank.position.x, tank.position.y, 100, 100)
            ctx.restore();
        }
        
        //ctx.fillStyle = "red";
        //ctx.fillRect(tank.position.x, tank.position.y, 10, 10);
    }

    const keyboardHandler = () =>{
        document.addEventListener('keydown', (e) => TankController.Move(e), { once: true })
        document.addEventListener('keyup', (e) => TankController.stopMove(e), { once: true })
        document.addEventListener("click", (e) => TankController.bulletController.shoot(e), {once: true})
    }

    return (
        <canvas style={{border: "1px solid black", height: thisWindow.height, width: thisWindow.width}} 
        ref={canvasRef}
        ></canvas>
    )
}