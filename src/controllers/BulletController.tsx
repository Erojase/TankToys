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
            BulletController.disableShooting();
            BulletController._bullet.currentJumps = 0;
            BulletController._bullet.position = {...TankController.tank.position};
            console.log("disparo");
            BulletController._bullet.rotation = TankController.cannonRotation;
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

            BulletController._bullet.moveBullet(xDiff*-1,yDiff*-1);

            // console.log(xDiff);
            // console.log(yDiff);
            
            
           
        }

        
    }
}
