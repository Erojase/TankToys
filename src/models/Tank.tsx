import { angleToCoords } from "../utils/utils";

export interface Position{
    x: number;
    y: number;
}


export class Tank {

    public position: Position = {
        x: 0,
        y: 0
    };

    public rotation: number = 0;

    public speed = 10;

    constructor() {
        
    }


    /**
     * moveX
     */
    public moveX(steps:number) {
        this.position.x += steps;
    }

    /**
     * moveY
     */
    public moveY(steps:number) {
        this.position.y += steps;
    }

    public move(pos:Position){
        debugger;
        let coords = angleToCoords(pos.x, pos.y, this.rotation, this.speed);
        this.position.x += coords.x;
        this.position.y += coords.y;
    }

    public rotate(degrees:number){
        debugger;
        while (degrees > 360){
            degrees -= 360
        }
        this.rotation = degrees + this.rotation;
    }
}