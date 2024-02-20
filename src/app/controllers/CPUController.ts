import { Bullet } from '../models/Bullet';
import { GameMap } from "../models/Map";
import { Position, Tank } from '../models/Tank';

export class CPUController {
    private static _cpu: Tank = new Tank;

    private static players: Tank[] = [];

    public static get cpu(): Tank {
        return this._cpu;
    }
    public static set tank(v: Tank) {
        this._cpu = v;
    }
    public static scopePos: Position = {
        x: 0,
        y: 0
    };

    public static cannonRotation: number = 50;

    public static addPlayerToTrack(player: Tank) {
        console.log("tumadre un tanke");
        
        console.log(player);

        this.players.push(player);
    }

    public static trackTank() {
        let centerX = 500;
        let centerY = 575;

        // this.scopePos = { x: e.pageX, y: e.pageY }
        let dx = this.players[0].position.y - centerY;
        let dy = this.players[0].position.x - centerX;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;       
    }

    
}