import { KeyboardEvent } from "react";
import { Tank } from "../models/Tank";


class MovementKeys {
    static readonly Forward = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Backward = ["s", "S", "ArrowDown"]
}


export class TankController {
    
    public static directions:string[] = [];

    private static _tank: Tank = new Tank();
    public static get tank(): Tank {
        return this._tank;
    }
    public static set tank(v: Tank) {
        this._tank = v;
    }


    static triggerComponentRender: () => void = () => { };


    public static addKey(key:string){
        if (!TankController.directions.includes(key)) {
            TankController.directions.push(key)
            console.log(TankController.directions);
        }
    }

    public static removeKey(key:string){
        if (TankController.directions.includes(key)) {
            TankController.directions.splice(TankController.directions.indexOf(key), 1)
            console.log(TankController.directions);
        }
    }


    
    public static Move() {

        if (MovementKeys.Forward.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveX(TankController.tank.speed * -1)
            TankController.triggerComponentRender();
        }
        if (MovementKeys.Backward.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveX(TankController.tank.speed)
            TankController.triggerComponentRender();
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveY(TankController.tank.speed * -1)
            TankController.triggerComponentRender();
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            TankController.tank.moveY(TankController.tank.speed)
            TankController.triggerComponentRender();
        }
    }
}