import { Position, Tank } from "../models/Tank";
import { Bullet } from '../models/Bullet';
import { GameMap } from "../models/Map";
import { CPUController } from "./CPUController";
import { BulletController } from "./BulletController";


class MovementKeys {
    static readonly Up = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Down = ["s", "S", "ArrowDown"]
}

let directions: string[] = [];

export class TankController {

    public static directions: string[] = [];

    private static _tank: Tank = new Tank();
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
                console.log("Up");
                return;
            } else {
                TankController.tank.moveX(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Down.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,TankController.tank.speed,0,0, "player")) {
                this.removeKeys(MovementKeys.Down)
                // TankController.tank.moveX(TankController.tank.speed * -1)
                console.log("Down");
                return;
            } else {
                TankController.tank.moveX(TankController.tank.speed)
            }
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,0,TankController.tank.speed * -1,0, "player")) {
                this.removeKeys(MovementKeys.Left)
                // TankController.tank.moveY(TankController.tank.speed)
                console.log("Left");
                return;
            } else {                
                TankController.tank.moveY(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlockV2(tank,0,0,0,TankController.tank.speed, "player")) {
                this.removeKeys(MovementKeys.Right)
                // TankController.tank.moveY(TankController.tank.speed * -1)
                console.log("Right");
                return;
            } else {
                
                TankController.tank.moveY(TankController.tank.speed)
            }
        }
    }
    public static MoveV2(tank:DOMRect) {
        
        if (MovementKeys.Up.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,TankController.tank.speed * -1,0,0,0, "player")) {
                console.log("Moving Up");
                TankController.tank.moveX(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Down.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,TankController.tank.speed,0,0, "player")) {
                console.log("Moving Down");
                TankController.tank.moveX(TankController.tank.speed)
            }
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,0,TankController.tank.speed * -1,0, "player")) {
                console.log("Moving Left");
                TankController.tank.moveY(TankController.tank.speed * -1)
            }
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            if (!GameMap.checkIfBlockV2(tank,0,0,0,TankController.tank.speed, "player")) {
                console.log("Moving Right");
                TankController.tank.moveY(TankController.tank.speed)
            }
        }

        CPUController.trackTank();
    }


    public static scopePlacement(e: MouseEvent) {
        let centerX = this._tank.position.x + 45 / 2;
        let centerY = this._tank.position.y + 45 / 2;

        this.scopePos = { x: e.pageX, y: e.pageY }
        let dx = e.pageX - centerY;
        let dy = e.pageY - centerX;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;
    }
    private static cont = 0;

    public static shootBullet() {
        BulletController.shoot(this.bullets[this.cont], this.tank.position, this.scopePos, this.cannonRotation, "player", "tankBullet"+this.cont);
        this.cont++;
        if (this.cont > this.bullets.length -1) {
            this.cont = 0;
        }
    }

}