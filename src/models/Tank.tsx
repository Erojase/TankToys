
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
        if (steps > 0) {
            this.position.x += steps;
            return;
        }
        this.position.x -= steps;
    }

    /**
     * moveY
     */
    public moveY(steps:number) {
        if (steps > 0) {
            this.position.y += steps;
            return;
        }
        this.position.y -= steps;
    }

    // public rotate(degrees:number){
    //     while (degrees > 360){
    //         degrees -= 360
    //     }
    //     this.rotation = degrees + this.rotation;
    // }
}