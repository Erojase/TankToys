import BulletComponent from '../components/Bullet';
import { TankController } from '../controllers/TankController';
import { Position } from './Tank';

export class Bullet {
    public position: Position = {
        x: 100,
        y: 100
    };

    public speed = 1;
    public rotation = 0;

    constructor() {
        // BulletComponent;
    }


    public moveBullet(x:number,y:number) {
        setTimeout(() => {
            this.position.x += x;
            this.position.y += y;
            // console.log(this.position);
            this.moveBullet(x,y);
            
        }, 24);
    }


    

}

