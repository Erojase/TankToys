import { BulletController } from '../controllers/BulletController';
import { Position } from './Tank';

export class Bullet {

    private maxJumps = 400;
    public currentJumps = 0;

    public position: Position = {
        x: 100,
        y: 100
    };

    public speed = 1;
    public rotation = 0;
    public xDiff:number = 0;
    public yDiff:number = 0;

    constructor() {
        // BulletComponent;
    }


    public moveBullet(x:number,y:number) { 
        setTimeout(()=>{
            this.position.x += x;
            this.position.y += y;
            // this.moveBullet(x, y);
            // console.log("x: " + this.position.x + ",y: " + this.position.y);
            
            BulletController.triggerComponentRender();
        }, 200)
        this.currentJumps++;
        // console.log("tumadre");
        
        if (this.currentJumps != this.maxJumps) {
            this.moveBullet(x, y);     
        }
        

    }


    

}

