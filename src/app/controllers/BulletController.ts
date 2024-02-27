import { Bullet } from "../models/Bullet";
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
    
    static triggerComponentRender: () => void = () => { };

    public static async disableShooting(){
        BulletController.enabled = false;
        return new Promise<void>(() => {
            setTimeout(() => {
                BulletController.enabled = true;
            }, 1000);
        })
    }

    
    public static shoot(bullet:Bullet) {

        if (BulletController.enabled) {
            bullet.stopMoves();
            BulletController.disableShooting();
            bullet.currentBounce = 0;
            bullet.position.x = TankController.tank.position.y+12.5;
            bullet.position.y = TankController.tank.position.x+10;
            console.log("disparo");
            bullet.rotation = TankController.cannonRotation;
            let xDiff = TankController.scopePos.x - TankController.tank.position.y+22.5;
            let yDiff = TankController.scopePos.y - TankController.tank.position.x+22.5;
            
            let xSeg = TankController.scopePos.x;
            let ySeg = TankController.scopePos.y;
            while (Math.abs(xDiff) > 20 || Math.abs(yDiff) > 20) {
                xSeg = (TankController.tank.position.y+22.5 + xSeg)/2;
                ySeg = (TankController.tank.position.x+22.5 + ySeg)/2;
                xDiff = TankController.tank.position.y+22.5 - xSeg;
                yDiff = TankController.tank.position.x+22.5 - ySeg;
                // console.log(xDiff);
                // console.log(yDiff);
            }
            console.log(xDiff);
            console.log(yDiff);
            
            bullet.xDiff = xDiff;
            bullet.yDiff = yDiff;

            
            
            bullet.moveBullet(bullet.xDiff*-1,bullet.yDiff*-1);

            // console.log(xDiff);
            // console.log(yDiff);
            
            
           
        }

        
    }

    
}
