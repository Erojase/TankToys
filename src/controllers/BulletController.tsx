import { KeyboardEvent } from "react";
import { Bullet } from "../models/Bullet";
import { Directions, Filter } from "@mui/icons-material";
import { TankController } from "./TankController";
import { tank } from '../pages/game';
import { Position } from "../models/Tank";
import { log } from "console";

export class BulletController {
    
    
    private static _bullet : Bullet = new Bullet();
    public static get bullet() : Bullet {
        return this._bullet;
    }
    public static set bullet(v : Bullet) {
        this._bullet = v;
    }
    

    public static shoot() {
        this._bullet.rotation = TankController.cannonRotation;
        console.log(this._bullet.rotation);
        let xDiff = TankController.scopePos.x - TankController.tank.position.y;
        let yDiff = TankController.scopePos.y - TankController.tank.position.x;

        let xSeg = TankController.scopePos.x;
        let ySeg = TankController.scopePos.y;
        while (Math.abs(xDiff) > 1 && Math.abs(yDiff) > 1) {
            xSeg = (TankController.tank.position.y + xSeg)/2;
            ySeg = (TankController.tank.position.x + ySeg)/2;
            xDiff = TankController.tank.position.y - xSeg;
            yDiff = TankController.tank.position.x - ySeg;
            // console.log(xDiff);
            // console.log(yDiff);
        }
        console.log(xDiff);
        console.log(yDiff);

        this._bullet.moveBullet(xDiff,yDiff);
        
    }
}
