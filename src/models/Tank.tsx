import { Mouse } from "@mui/icons-material";

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
        x: 0,
        y: 0
    };

    public rotation: number = 0;

    public cannon: Cannon | undefined = new Cannon();

    public speed = 1;

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

    public rotate(degrees:number){
        while (degrees > 360){
            degrees -= 360
        }
        this.rotation = degrees + this.rotation;
    }
}