
export interface Position{
    x: number;
    y: number;
}


export class Tank {

    public position: Position = {
        x: 0,
        y: 0
    };

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
}