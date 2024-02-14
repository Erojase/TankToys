import { BulletController } from '../controllers/BulletController';
import { GameMap } from './Map';
import { Position } from './Tank';

export class Bullet {

    private maxJumps = 100010;
    public currentJumps = 0;

    public position: Position = {
        x: 100,
        y: 100
    };

    public speed = 24;
    public rotation = 0;
    public xDiff:number = 0;
    public yDiff:number = 0;

    constructor() {
        // BulletComponent;
    }


    public async moveBullet(x:number,y:number) { 
        setTimeout(()=>{
            this.position.x += x;
            this.position.y += y;
            // this.moveBullet(x, y);
            // console.log("x: " + this.position.x + ",y: " + this.position.y);
            
            BulletController.triggerComponentRender();
            this.currentJumps++;
            
            if (this.currentJumps != this.maxJumps && !GameMap.checkIfBlockNullet(this.position, x, y)) {
                this.moveBullet(x, y);  
                return;   
            }
        }, this.speed)
        

    }

    public stopMoves(){
        this.currentJumps = this.maxJumps;
    }


    

}

