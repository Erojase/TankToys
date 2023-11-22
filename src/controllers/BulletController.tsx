import { KeyboardEvent } from "react";
import { Bullet } from "../models/Bullet";
import { Directions, Filter } from "@mui/icons-material";
import { TankController } from "./TankController";
import { tank } from '../pages/game';
import { Position } from "../models/Tank";

export class BulletController {
    
    public static shoot(e: globalThis.MouseEvent, origin: Position) {
        let bullet = new Bullet();
        bullet.speed = 5;
        bullet.position = origin;
    }
}
