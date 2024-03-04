import { Bullet } from '../models/Bullet';
import { GameMap } from "../models/Map";
import { Position, Tank } from '../models/Tank';
import { BulletController } from './BulletController';
import { TankController } from './TankController';

export class CPUController {
    private static _cpu: Tank = new Tank;

    private static position: Position = {
        x:500,
        y: 575
    }

    public static bullet: Bullet;

    private static players: Tank[] = [];

    public static get cpu(): Tank {
        return this._cpu;
    }
    public static set tank(v: Tank) {
        this._cpu = v;
    }

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

    public static shootBullet() {
        console.log("CPUShoot");
        
        console.log(this.players[0].position);
        let realTargetPos: Position = {
            x: this.players[0].position.y+25,
            y: this.players[0].position.x+25
        }
        
        BulletController.shoot(this.bullet, this.position, realTargetPos, this.cannonRotation, "cpu");
    }
}