import { KeyboardEvent } from "react";
import { Tank } from "../models/Tank";


class MovementKeys {
    static readonly Forward = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Backward = ["s", "S", "ArrowDown"]
}

let directions:string[] = [];

export class TankController {



    private static _tank: Tank = new Tank();
    public static get tank(): Tank {
        return this._tank;
    }
    public static set tank(v: Tank) {
        this._tank = v;
    }


    static triggerComponentRender: () => void = () => { };

    public static stopMove(e: globalThis.KeyboardEvent) {
        directions.splice(directions.indexOf(e.key),1);
    }

    /**
     * Move
     */
    public static Move(e: globalThis.KeyboardEvent) {
        console.log(this._tank.position);

        if (!directions.includes(e.key)) {
            directions.push(e.key);
        }

        // console.log("tumadre");
        
        // console.log(directions);
        // // console.log(MovementKeys.Forward.filter(i => directions.includes(i)));
        // console.log(directions.filter(i => MovementKeys.Forward.includes(i)));
        
        

        if (directions.filter(i => MovementKeys.Forward.includes(i)).length != 0) 
            this._tank.moveY(-this._tank.speed);
        if (directions.filter(i => MovementKeys.Left.includes(i)).length != 0)
            this._tank.moveX(-this._tank.speed);
        if (directions.filter(i => MovementKeys.Right.includes(i)).length != 0)
            this._tank.moveX(this._tank.speed);
        if (directions.filter(i => MovementKeys.Backward.includes(i)).length != 0)
            this._tank.moveY(this._tank.speed);

        this.triggerComponentRender();
    }
}