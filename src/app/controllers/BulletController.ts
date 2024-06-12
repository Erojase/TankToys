import { Bullet } from "../models/Bullet";
import { GameMap } from "../models/Map";
import { Position } from "../models/Tank";
import { GameController } from "./GameController";
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



    public static async disableShooting(bullet: Bullet){
        BulletController.enabled = false;
        return new Promise<void>(() => {
            setTimeout(() => {
                BulletController.enabled = true;
            }, bullet.cooldown);
        })
    }

    
    public static shoot(bullet:Bullet, tankPos: Position, target: Position, cannonRotation:number, owner: string, bulletName: string) {
        //console.log(GameMap.colliders[bulletName])
        if (BulletController.enabled) {
            bullet.stopMoves();
            BulletController.disableShooting(bullet);
            bullet.currentBounce = 0;
            //console.log("disparo");                       
            bullet.rotation = cannonRotation;
            let xDiff = target.x - tankPos.y+bullet.wBullet;
            let yDiff = target.y - tankPos.x+bullet.hBullet;
            
            let xSeg = target.x;
            let ySeg = target.y;
            while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                xSeg = (tankPos.y+bullet.wBullet + xSeg)/2;
                ySeg = (tankPos.x+bullet.hBullet + ySeg)/2;
                xDiff = tankPos.y+bullet.wBullet - xSeg;
                yDiff = tankPos.x+bullet.hBullet - ySeg;
            }
            //console.log(xDiff);
            //console.log(yDiff);
            
            bullet.xDiff = xDiff;
            bullet.yDiff = yDiff;

            bullet.position.x = tankPos.y+((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top)/2)-(bullet.wBullet/2); //Falta hacer que el width de la bala sea ajustable hacer con GameMap.colliders
            bullet.position.y = tankPos.x+((GameMap.colliders["player"].right - GameMap.colliders["player"].left)/2)-(bullet.hBullet/2);
            
            bullet.position.x += bullet.xDiff*-2;
            bullet.position.y += bullet.yDiff*-2;

            bullet.moveBullet(bullet.xDiff*-1,bullet.yDiff*-1, owner, bulletName);       
        }

        
    }

    
}
