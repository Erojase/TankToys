import { Position, Tank } from "../models/Tank";
import { Bullet } from '../models/Bullet';
import { GameMap } from "../models/Map";


class MovementKeys {
    static readonly Forward = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Backward = ["s", "S", "ArrowDown"]
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



    public static Move(tank:DOMRect) {

        if (MovementKeys.Forward.filter(x => TankController.directions.includes(x)).length > 0) {
            if (GameMap.checkIfBlock(tank)) {
                return;
            }
            TankController.tank.moveX(TankController.tank.speed * -1)
        }
        if (MovementKeys.Backward.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveX(TankController.tank.speed)
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveY(TankController.tank.speed * -1)
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveY(TankController.tank.speed)
        }
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

}