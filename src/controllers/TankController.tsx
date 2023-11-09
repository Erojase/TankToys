import { KeyboardEvent } from "react";
import { Tank } from "../models/Tank";


class MovementKeys {
    static readonly Forward = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Backward = ["s", "S", "ArrowDown"]
}


export class TankController {



    private static _tank: Tank;
    public static get tank(): Tank {
        return this._tank;
    }
    public static set tank(v: Tank) {
        this._tank = v;
    }


    static triggerComponentRender: () => void = () => { };

    /**
     * Move
     */
    public static Move(e: globalThis.KeyboardEvent) {
        console.log(this._tank.position);

        if (MovementKeys.Forward.includes(e.key))
            this._tank.moveY(-this._tank.speed);
        else if (MovementKeys.Left.includes(e.key))
            this._tank.moveX(-this._tank.speed);
        else if (MovementKeys.Right.includes(e.key))
            this._tank.moveX(this._tank.speed);
        else if (MovementKeys.Backward.includes(e.key))
            this._tank.moveY(this._tank.speed);

        this.triggerComponentRender();
    }
}