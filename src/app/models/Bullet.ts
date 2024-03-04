import { BulletController } from '../controllers/BulletController';
import { GameMap } from './Map';
import { Position } from './Tank';

export class Bullet {

    private maxBounce = 1;
    public currentBounce = 0;

    public position: Position = {
        x: -0,
        y: -30
    };

    public speed = 24;
    public rotation = 0;
    public xDiff:number = 0;
    public yDiff:number = 0;

    constructor() {
        // BulletComponent;
    }


    public async moveBullet(x:number,y:number, owner:string) { 
        setTimeout(()=>{
            this.position.x += x;
            this.position.y += y;
            // this.moveBullet(x, y);
            // console.log("x: " + this.position.x + ",y: " + this.position.y);
            
            let block: boolean[] = GameMap.checkIfBlockNullet(this.position, x, y, owner);
            
            if (!block[0] && this.currentBounce <= this.maxBounce) {
                this.moveBullet(x, y, owner);  
                return;   
            } else {
                this.currentBounce++;
                
                if (this.currentBounce <= this.maxBounce) {
                    if (block[1]) {
                        let rotatInDeg = ((this.rotation*180)/Math.PI);
                        this.rotation = ((((180-rotatInDeg)*Math.PI)/180));
                        // console.log((this.rotation*180)/Math.PI);
                        x = x*-1;
                        console.log("-x");
                        
                    } else {
                        // console.log((this.rotation*180)/Math.PI);
                        this.rotation *= -1;
                        // console.log((this.rotation*180)/Math.PI);
                        y = y*-1;
                        console.log("-y");
                        
                    }
                    this.moveBullet(x, y, owner); 
                } else {
                    this.position = {
                        x: -0,
                        y: -30
                    }
                }
                
            }
        }, this.speed)
        

    }

    public stopMoves(){
        
        this.currentBounce = this.maxBounce;
    }


    

}

