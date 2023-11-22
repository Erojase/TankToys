import { KeyboardEvent } from "react";
import { Bullet } from "../models/Bullet";
import { Directions, Filter } from "@mui/icons-material";
// import { Tank } from "../controllers/TankController"

export class BulletController {
    
    private _bullet : Bullet;
    public get bullet() : Bullet {
        return this._bullet;
    }
    public set bullet(v : Bullet) {
        this._bullet = v;
    }
    
    constructor() {
        this._bullet = new Bullet;
    }

    public shoot(e: globalThis.MouseEvent, tank: TankController) {
        this._bullet = new Bullet;
        this._bullet.speed = 5;
        this._bullet.position = tank.position;
    }
}