import { CPUController } from "../controllers/CPUController";
import { angleToCoords, delay } from "../utils/utils";
import { Collider, GameMap } from "./Map";

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

    public speed = 10;


    constructor(defaultPos: Position) {
        this.position = defaultPos!;
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

    public async moveXBot(steps:number) {
        let nextBlock: Boolean = false;
        let tankCPUQ = CPUController.getQuadrant("cpu");
        debugger;
        while (!nextBlock) {
            this.position.x += steps;
            let checkQ = CPUController.getQuadrant("cpu");
            if (tankCPUQ != checkQ) {
                nextBlock = true
                tankCPUQ = checkQ;
            }
            await delay(24);
        }
        debugger;
        let cpu = GameMap.colliders["cpu"];
        if (steps > 0) {
            this.position.x += (((cpu.bottom - cpu.top)/3)); 
        } else {
            this.position.x += (((cpu.bottom - cpu.top)/3))*-1; 
        }
        
    }

    
    public async moveYBot(steps:number) {
        let nextBlock: Boolean = false;
        let tankCPUQ = CPUController.getQuadrant("cpu");
        debugger;
        while (!nextBlock) {
            this.position.y += steps;
            let checkQ = CPUController.getQuadrant("cpu");
            console.log("checkQ: " + checkQ);
            console.log("tankCPUQ: " + tankCPUQ);
            
            if (tankCPUQ != checkQ) {
                nextBlock = true
            }
            await delay(24);
        }
        debugger;
        let cpu = GameMap.colliders["cpu"];
        if (steps > 0) {
            this.position.y += (((cpu.right - cpu.left)/3)); 
        } else {
            this.position.y += (((cpu.right - cpu.left)/3))*-1; 
        }
    }

    public move(pos:Position){
        let coords = angleToCoords(pos.x, pos.y, this.rotation, this.speed);
        this.position.x += coords.x;
        this.position.y += coords.y;
    }

    public rotate(degrees:number){
        while (degrees > 360){
            degrees -= 360
        }
        this.rotation = degrees + this.rotation;
    }
}