import { Bullet } from "../models/Bullet";
import { TankController } from "./TankController";


export class BulletController {
    
    private static enabled = true;

    private static _bullet : Bullet = new Bullet();
    public static get bullet() : Bullet {
        return this._bullet;
    }
    public static set bullet(v : Bullet) {
        this._bullet = v;
    }
    
    static triggerComponentRender: () => void = () => { };

    public static async disableShooting(){
        BulletController.enabled = false;
        return new Promise<void>(() => {
            setTimeout(() => {
                BulletController.enabled = true;
            }, 1000);
        })
    }

    
    public static shoot() {

        if (BulletController.enabled) {
            BulletController._bullet.stopMoves();
            BulletController.disableShooting();
            BulletController._bullet.currentJumps = 0;
            BulletController._bullet.position.x = TankController.tank.position.y+12.5;
            BulletController._bullet.position.y = TankController.tank.position.x+10;
            console.log("disparo");
            BulletController._bullet.rotation = TankController.cannonRotation;
            let xDiff = TankController.scopePos.x - TankController.tank.position.y+22.5;
            let yDiff = TankController.scopePos.y - TankController.tank.position.x+22.5;
            
            let xSeg = TankController.scopePos.x;
            let ySeg = TankController.scopePos.y;
            while (Math.abs(xDiff) > 1 && Math.abs(yDiff) > 1) {
                xSeg = (TankController.tank.position.y+22.5 + xSeg)/2;
                ySeg = (TankController.tank.position.x+22.5 + ySeg)/2;
                xDiff = TankController.tank.position.y+22.5 - xSeg;
                yDiff = TankController.tank.position.x+22.5 - ySeg;
                // console.log(xDiff);
                // console.log(yDiff);
            }
            BulletController._bullet.xDiff = xDiff;
            BulletController._bullet.yDiff = yDiff;

            
            
            BulletController._bullet.moveBullet(BulletController._bullet.xDiff*-1,BulletController._bullet.yDiff*-1);

            // console.log(xDiff);
            // console.log(yDiff);
            
            
           
        }

        
    }

    
}
