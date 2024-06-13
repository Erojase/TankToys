import { Bullet } from "../models/Bullet";
import { GameMap } from "../models/Map";
import { Position } from "../models/Tank";
import { delay } from "../utils/utils";
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



    public static async disableShooting(bullet: Bullet) {
        BulletController.enabled = false;
        return new Promise<void>(() => {
            setTimeout(() => {
                BulletController.enabled = true;
            }, bullet.cooldown);
        })
    }

    public static shoot(bullet: Bullet, tankPos: Position, target: Position, cannonRotation: number, owner: string, bulletName: string) {
        //console.log(GameMap.colliders[bulletName])
        if (BulletController.enabled) {
            bullet.stopMoves();
            BulletController.disableShooting(bullet);
            bullet.currentBounce = 0;
            //console.log("disparo");                       
            bullet.rotation = cannonRotation;
            let xDiff = target.x - tankPos.y + bullet.wBullet;
            let yDiff = target.y - tankPos.x + bullet.hBullet;

            let xSeg = target.x;
            let ySeg = target.y;
            while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                xSeg = (tankPos.y + bullet.wBullet + xSeg) / 2;
                ySeg = (tankPos.x + bullet.hBullet + ySeg) / 2;
                xDiff = tankPos.y + bullet.wBullet - xSeg;
                yDiff = tankPos.x + bullet.hBullet - ySeg;
            }
            //console.log(xDiff);
            //console.log(yDiff);

            bullet.xDiff = xDiff;
            bullet.yDiff = yDiff;

            bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2); //Falta hacer que el width de la bala sea ajustable hacer con GameMap.colliders
            bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);

            bullet.position.x += bullet.xDiff * -2;
            bullet.position.y += bullet.yDiff * -2;

            bullet.moveBullet(bullet.xDiff * -1, bullet.yDiff * -1, owner, bulletName);
        }


    }

    public static shootSuperNormal(bullets: Bullet[], tankPos: Position, target: Position, cannonRotation: number, owner: string, bulletName: string) {
        //console.log(GameMap.colliders[bulletName])
        if (BulletController.enabled) {

            let dispersion: number = 1;
            bullets.forEach(bullet => {
                bullet.stopMoves();
                BulletController.disableShooting(bullet);
                bullet.currentBounce = 0;
                //console.log("disparo");                       
                bullet.rotation = cannonRotation;
                let xDiff = target.x - tankPos.y + bullet.wBullet;
                let yDiff = target.y - tankPos.x + bullet.hBullet;
    
                let xSeg = target.x;
                let ySeg = target.y;
                while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                    xSeg = (tankPos.y + bullet.wBullet + xSeg) / 2;
                    ySeg = (tankPos.x + bullet.hBullet + ySeg) / 2;
                    xDiff = tankPos.y + bullet.wBullet - xSeg;
                    yDiff = tankPos.x + bullet.hBullet - ySeg;
                }
                //console.log(xDiff);
                //console.log(yDiff);
    
                bullet.xDiff = xDiff;
                bullet.yDiff = yDiff;

                let sumDiff = Math.abs(bullet.xDiff) + Math.abs(bullet.yDiff);
                let dispersionx = ((Math.abs(bullet.xDiff) / (sumDiff / 100)));
                let dispersiony = ((Math.abs(bullet.yDiff) / (sumDiff / 100)));
    
                bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2); 
                bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);
    
                // bullet.position.x = bullet.position.x - dispersion * (dispersiony / 100);
                // bullet.position.y = bullet.position.y - dispersion * (dispersionx / 100);

                bullet.position.x += bullet.xDiff * -2;
                bullet.position.y += bullet.yDiff * -2;
    
                if ((bullet.xDiff > 0 && bullet.yDiff > 0) || (bullet.xDiff < 0 && bullet.yDiff < 0)) {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff + dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                } else {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff - dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                }
                dispersion--;
            });

        }


    }

    public static shootShotgun(bullets: Bullet[], tankPos: Position, target: Position, cannonRotation: number, owner: string, bulletName: string, dispersion:number) {
        if (BulletController.enabled) {
            // let dispersion: number = 3;
            for (const bullet of bullets) {

                bullet.stopMoves();
                BulletController.disableShooting(bullet);
                bullet.currentBounce = 0;
                //console.log("disparo");                       
                bullet.rotation = cannonRotation;
                let xDiff = target.x - tankPos.y + bullet.wBullet;
                let yDiff = target.y - tankPos.x + bullet.hBullet;

                let xSeg = target.x;
                let ySeg = target.y;
                while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                    xSeg = (tankPos.y + bullet.wBullet + xSeg) / 2;
                    ySeg = (tankPos.x + bullet.hBullet + ySeg) / 2;
                    xDiff = tankPos.y + bullet.wBullet - xSeg;
                    yDiff = tankPos.x + bullet.hBullet - ySeg;
                }
                //console.log(xDiff);
                //console.log(yDiff);

                bullet.xDiff = xDiff;
                bullet.yDiff = yDiff;

                bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2);
                bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);

                bullet.position.x += bullet.xDiff * -2;
                bullet.position.y += bullet.yDiff * -2;

                let sumDiff = Math.abs(bullet.xDiff) + Math.abs(bullet.yDiff);
                let dispersionx = ((Math.abs(bullet.xDiff) / (sumDiff / 100)));
                let dispersiony = ((Math.abs(bullet.yDiff) / (sumDiff / 100)));
                // console.log(dispersionx);
                // console.log(dispersiony);

                dispersion--;

                if ((bullet.xDiff > 0 && bullet.yDiff > 0) || (bullet.xDiff < 0 && bullet.yDiff < 0)) {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff + dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                } else {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff - dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                }

            }

        }
    }

    public static async shootSuperSubfusil(bullets: Bullet[], tankPos: Position, target: Position, cannonRotation: number, owner: string, bulletName: string) {
        if (BulletController.enabled) {

            for (const bullet of bullets) {
                bullet.stopMoves();
                BulletController.disableShooting(bullet);
                bullet.currentBounce = 0;
                //console.log("disparo");                       
                bullet.rotation = cannonRotation;
                let xDiff = target.x - tankPos.y + bullet.wBullet;
                let yDiff = target.y - tankPos.x + bullet.hBullet;

                let xSeg = target.x;
                let ySeg = target.y;
                while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                    xSeg = (tankPos.y + bullet.wBullet + xSeg) / 2;
                    ySeg = (tankPos.x + bullet.hBullet + ySeg) / 2;
                    xDiff = tankPos.y + bullet.wBullet - xSeg;
                    yDiff = tankPos.x + bullet.hBullet - ySeg;
                }

                bullet.xDiff = xDiff;
                bullet.yDiff = yDiff;

                bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2);
                bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);

                bullet.position.x += bullet.xDiff * -2;
                bullet.position.y += bullet.yDiff * -2;

                let sumDiff = Math.abs(bullet.xDiff) + Math.abs(bullet.yDiff);
                let dispersionx = ((Math.abs(bullet.xDiff) / (sumDiff / 100)));
                let dispersiony = ((Math.abs(bullet.yDiff) / (sumDiff / 100)));

                let dispersion = Math.floor(Math.random()*21)-10;

                if ((bullet.xDiff > 0 && bullet.yDiff > 0) || (bullet.xDiff < 0 && bullet.yDiff < 0)) {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff + dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                } else {
                    bullet.moveBullet((bullet.xDiff - dispersion * (dispersiony / 100)) * -1, (bullet.yDiff - dispersion * (dispersionx / 100)) * -1, owner, bulletName);
                }
                await delay(100);
            }

        }
    }

    public static async shootRafagas(bullets: Bullet[], tankPos: Position, target: Position, cannonRotation: number, owner: string, bulletName: string) {
        if (BulletController.enabled) {

            for (const bullet of bullets) {
                bullet.stopMoves();
                BulletController.disableShooting(bullet);
                bullet.currentBounce = 0;
                //console.log("disparo");                       
                bullet.rotation = cannonRotation;
                let xDiff = target.x - tankPos.y + bullet.wBullet;
                let yDiff = target.y - tankPos.x + bullet.hBullet;

                let xSeg = target.x;
                let ySeg = target.y;
                while (Math.abs(xDiff) > 24 || Math.abs(yDiff) > 24) {
                    xSeg = (tankPos.y + bullet.wBullet + xSeg) / 2;
                    ySeg = (tankPos.x + bullet.hBullet + ySeg) / 2;
                    xDiff = tankPos.y + bullet.wBullet - xSeg;
                    yDiff = tankPos.x + bullet.hBullet - ySeg;
                }

                bullet.xDiff = xDiff;
                bullet.yDiff = yDiff;

                bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2);
                bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);

                bullet.position.x += bullet.xDiff * -2;
                bullet.position.y += bullet.yDiff * -2;

                bullet.moveBullet(bullet.xDiff * -1, bullet.yDiff * -1, owner, bulletName);
                await delay(100);
            }

        }
    }

    public static shootTurtle(bullets: Bullet[], tankPos: Position, target: Position, owner: string, bulletName: string, diff:number) {
        if (BulletController.enabled) {
            let startRotation = 0;
            // let diff = -0.375;
            bullets.forEach(bullet => {

                bullet.stopMoves();
                BulletController.disableShooting(bullet);
                bullet.currentBounce = 0;
                //console.log("disparo");   
                bullet.rotation = startRotation;
                console.log(startRotation);

                startRotation += diff;
                if (startRotation == -3) {
                    startRotation = 3;
                }

                bullet.position.x = tankPos.y + ((GameMap.colliders["player"].bottom - GameMap.colliders["player"].top) / 2) - (bullet.wBullet / 2);
                bullet.position.y = tankPos.x + ((GameMap.colliders["player"].right - GameMap.colliders["player"].left) / 2) - (bullet.hBullet / 2);

                switch (bullet.rotation) {
                    case 0:
                        bullet.moveBullet(20, 0, owner, bulletName);
                        break;
                    case -0.375:
                        bullet.moveBullet(20, -10, owner, bulletName);
                        break;
                    case -0.75:
                        bullet.moveBullet(20, -20, owner, bulletName);
                        break;
                    case -1.125:
                        bullet.moveBullet(10, -20, owner, bulletName);
                        break;
                    case -1.5:
                        bullet.moveBullet(0, -20, owner, bulletName);
                        break;
                    case -1.875:
                        bullet.moveBullet(-10, -20, owner, bulletName);
                        break;
                    case -2.25:
                        bullet.moveBullet(-20, -20, owner, bulletName);
                        break;
                    case -2.625:
                        bullet.moveBullet(-20, -10, owner, bulletName);
                        break;
                    case 3:
                        bullet.moveBullet(-20, 0, owner, bulletName);
                        break;
                    case 2.625:
                        bullet.moveBullet(-20, 10, owner, bulletName);
                        break;
                    case 2.25:
                        bullet.moveBullet(-20, 20, owner, bulletName);
                        break;
                    case 1.875:
                        bullet.moveBullet(-10, 20, owner, bulletName);
                        break;
                    case 1.5:
                        bullet.moveBullet(0, 20, owner, bulletName);
                        break;
                    case 1.125:
                        bullet.moveBullet(10, 20, owner, bulletName);
                        break;
                    case 0.75:
                        bullet.moveBullet(20, 20, owner, bulletName);
                        break;
                    case 0.375:
                        bullet.moveBullet(20, 10, owner, bulletName);
                        break;
                    default:
                        break;
                }

            });
        }
    }

    



}

