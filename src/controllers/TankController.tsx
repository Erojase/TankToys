import { KeyboardEvent } from "react";
import { Tank } from "../models/Tank";

enum MovementKeys {
    Forward = "w",
    Right = "d",
    Left = "a",
    Backward = "s"
}

export class TankController {

    
    
    private static _tank : Tank;
    public static get tank() : Tank {
        return this._tank;
    }
    public static set tank(v : Tank) {
        this._tank = v;
    }
    

    static triggerComponentRender: () => void = () => { };

    /**
     * Move
     */
    public static Move(e: globalThis.KeyboardEvent) {
        console.log(this._tank.position);

        switch (e.key) {
            case MovementKeys.Forward:
                this._tank.moveY(-this._tank.speed);
                break;
            case MovementKeys.Left:
                this._tank.moveX(-this._tank.speed);
                break;
            case MovementKeys.Right:
                this._tank.moveX(this._tank.speed);
                break;
            case MovementKeys.Backward:
                this._tank.moveY(this._tank.speed);
                break;
            default:
                break;
        }
        this.triggerComponentRender();
    }
}