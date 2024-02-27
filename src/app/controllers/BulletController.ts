import { Bullet } from "../models/Bullet";
import { Position } from "../models/Tank";
import { TankController } from "./TankController";


export class BulletController {
    
    private static enabled = true;

    // private static _bullet : Bullet = new Bullet();
    // public static get bullet() : Bullet {
    //     return this._bullet;
    // }
    // public static set bullet(v : Bullet) {
    //     this._bullet = v;
    // }



    public static async disableShooting(){
        BulletController.enabled = false;
        return new Promise<void>(() => {
            setTimeout(() => {
                BulletController.enabled = true;
            }, 200);
        })
    }

    
    public static shoot(bullet:Bullet, tankPos: Position, target: Position, cannonRotation:number, owner: string) {

        if (BulletController.enabled) {
            bullet.stopMoves();
            BulletController.disableShooting();
            bullet.currentBounce = 0;
            bullet.position.x = tankPos.y+12.5;
            bullet.position.y = tankPos.x+10;
            console.log("disparo");
            bullet.rotation = cannonRotation;
            let xDiff = target.x - tankPos.y+22.5;
            let yDiff = target.y - tankPos.x+22.5;
            
            let xSeg = target.x;
            let ySeg = target.y;
            while (Math.abs(xDiff) > 20 || Math.abs(yDiff) > 20) {
                xSeg = (tankPos.y+22.5 + xSeg)/2;
                ySeg = (tankPos.x+22.5 + ySeg)/2;
                xDiff = tankPos.y+22.5 - xSeg;
                yDiff = tankPos.x+22.5 - ySeg;
                // console.log(xDiff);
                // console.log(yDiff);
            }
            console.log(xDiff);
            console.log(yDiff);
            
            bullet.xDiff = xDiff;
            bullet.yDiff = yDiff;

            
            
            bullet.moveBullet(bullet.xDiff*-1,bullet.yDiff*-1, owner);

            // console.log(xDiff);
            // console.log(yDiff);
            
            
           
        }

        
    }

    
}
