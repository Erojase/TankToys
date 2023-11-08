import { KeyboardEvent } from "react";
import { Tank } from "../models/Tank";

enum MovementKeys {
    Forward = "w",
    Right = "d",
    Left = "a",
    Backward = "s"
}

export class TankController {

    private _tank: Tank;

    triggerComponentRender: () => void = () => { };

    constructor(tank: Tank) {
        this._tank = tank;
    }


    /**
     * setMoveEvents
     */
    public setMoveEvents(element: Document) {
        element.addEventListener('keydown', (e) => this.Move(e))
    }

    /**
     * Move
     */
    public Move(e: globalThis.KeyboardEvent) {
        console.log(this._tank.position);

        switch (e.key) {
            case MovementKeys.Forward:
                this._tank.moveX(this._tank.position.x + this._tank.speed)
                break;
            case MovementKeys.Left:

                break;
            case MovementKeys.Right:

                break;
            case MovementKeys.Backward:

                break;

            default:
                break;
        }
        this.triggerComponentRender();
    }
}