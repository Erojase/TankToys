import { angleToCoords } from "../utils/utils";
import { GameMap } from "./Map";

export interface Position{
    x: number;
    y: number;
}

export class Cannon{
    public position: Position = {
        x: 0,
        y: 0
    }
    public rotation: number = 0;

    constructor() {
        
    }

    public static mouseTrack(e: globalThis.MouseEvent) {
    
        console.log("x: " + e.clientX);
        console.log("y: " + e.clientY);
        
        
    }


}

export class Tank {

    public position: Position = {
        x: 250,
        y: 100
    };

    public rotation: number = 0;

    public speed = 10;

    constructor() {
        
    }


    /**
     * moveX
     */
    public moveX(steps:number) {
        // let chiv = GameMap.checkIfBlock(0,steps, this.position);
        // console.log(chiv);
        // console.log(this.position);
        
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