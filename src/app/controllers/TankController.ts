import { BulletType, Position, Tank } from "../models/Tank";
import { Bullet } from '../models/Bullet';
import { GameMap } from "../models/Map";
import { CPUManager } from "./CPUController";
import { BulletController } from "./BulletController";



class MovementKeys {
    static readonly Up = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Down = ["s", "S", "ArrowDown"]
}


export class TankController {

    public static directions: string[] = [];

    private static _tank: Tank;
    public static get tank(): Tank {
        return this._tank;
    }
    public static set tank(v: Tank) {
        this._tank = v;
    }
    public static scopePos: Position = {
        x: 0,
        y: 0
    };

    public static cannonRotation: number = 50;

    public static bullets:Bullet[] = [];


    public static addKey(key: string) {
        if (!TankController.directions.includes(key)) {
            TankController.directions.push(key)
        }
    }

    public static removeKey(key: string) {
        if (TankController.directions.includes(key)) {
            TankController.directions.splice(TankController.directions.indexOf(key), 1)
        }
    }

    public static removeKeys(keys: string[]) {
        keys.forEach(key => {
            this.removeKey(key);
        });
    }



    public static Move(tank:DOMRect) {
        
        if (MovementKeys.Up.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,TankController.tank.speed * -1,0,0,0, "player")) {
                this.removeKeys(MovementKeys.Up)
                // TankController.tank.moveX(TankController.tank.speed)
                return;
            } else {
                TankController.tank.moveX(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Down.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,TankController.tank.speed,0,0, "player")) {
                this.removeKeys(MovementKeys.Down)
                // TankController.tank.moveX(TankController.tank.speed * -1)
                return;
            } else {
                TankController.tank.moveX(TankController.tank.speed)
            }
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,0,TankController.tank.speed * -1,0, "player")) {
                this.removeKeys(MovementKeys.Left)
                // TankController.tank.moveY(TankController.tank.speed)
                return;
            } else {                
                TankController.tank.moveY(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,0,0,TankController.tank.speed, "player")) {
                this.removeKeys(MovementKeys.Right)
                // TankController.tank.moveY(TankController.tank.speed * -1)
                return;
            } else {
                
                TankController.tank.moveY(TankController.tank.speed)
            }
        }
    }
    public static MoveV2(tank:DOMRect) {
        if (MovementKeys.Up.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,TankController.tank.speed * -1,0,0,0, "player")) {
                TankController.tank.moveX(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Down.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,TankController.tank.speed,0,0, "player")) {
                TankController.tank.moveX(TankController.tank.speed)
            }
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,0,TankController.tank.speed * -1,0, "player")) {
                TankController.tank.moveY(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,0,0,TankController.tank.speed, "player")) {
                TankController.tank.moveY(TankController.tank.speed)
            }
        }

        CPUManager.trackTank();
    }


    public static scopePlacement(e: MouseEvent) {
        let centerX = this._tank.position.x + 45 / 2;
        let centerY = this._tank.position.y + 45 / 2;

        this.scopePos = { x: e.pageX, y: e.pageY }
        let dx = e.pageX - centerY;
        let dy = e.pageY - centerX;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;
        // console.log(this.cannonRotation);
        
    }
    private static cont = 0;

    public static shootBullet() {
        //debugger;
        if (this.tank.bulletType == BulletType.Shotgun || this.tank.bulletType == BulletType.SuperShotgun) {
            if (this.tank.bulletType == BulletType.Shotgun) {
                BulletController.shootShotgun(this.bullets, this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont, 3)
            } else {
                BulletController.shootShotgun(this.bullets, this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont, 5)
            }
        } else if (this.tank.bulletType == BulletType.Rafagas || this.tank.bulletType == BulletType.SuperRafagas) {
            BulletController.shootRafagas(this.bullets, this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont)
        } else if (this.tank.bulletType == BulletType.SuperSubfusil) {
            BulletController.shootSuperSubfusil(this.bullets, this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont)
        } else if (this.tank.bulletType == BulletType.Tortuga || this.tank.bulletType == BulletType.SuperTortuga) {
            if (this.tank.bulletType == BulletType.Tortuga) {
                BulletController.shootTurtle(this.bullets, this.tank.position, this.scopePos, "player", "playerBullet"+this.cont, -0.75)
            } else {
                BulletController.shootTurtle(this.bullets, this.tank.position, this.scopePos, "player", "playerBullet"+this.cont, -0.375)
            }
        } else if (this.tank.bulletType == BulletType.SuperNormal) {
            let tiro:Bullet[] = [];
            for (let i = 0; i < 3; i++) {
                tiro.push(this.bullets[this.cont]);
                TankController.cont++;
            }
            BulletController.shootSuperNormal(tiro, this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont)
            if (TankController.cont > this.bullets.length -1) {
                TankController.cont = 0;
            }
        } else {
            BulletController.shoot(this.bullets[this.cont], this.tank.position, this.scopePos, this.cannonRotation, "player", "playerBullet"+this.cont);
            TankController.cont++;
            if (TankController.cont > this.bullets.length -1) {
                TankController.cont = 0;
            }
        }
    }

}