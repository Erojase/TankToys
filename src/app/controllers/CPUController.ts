import { Bullet } from '../models/Bullet';
import { Collider, GameMap } from "../models/Map";
import { Position, Tank } from '../models/Tank';
import { BulletController } from './BulletController';
import { TankController } from './TankController';
import { delay } from '../utils/utils';


export class CPUManager {
    public static CPUs: CPUController[] = [];
    
    public static trackTank(){
        this.CPUs.forEach(CPU => {
            CPU.trackTank();
        });
    }

    static addPlayerToTrack(tank: Tank) {
        this.CPUs.forEach(CPU => {
            CPU.addPlayerToTrack(tank);
        });
    }
}


export class CPUController {
    
    constructor(position:Position){
        this._position = position;
    }

    public _name:string = "";

    private _position: Position 

    private _cpu: Tank;

    public bullet: Bullet;

    private players: Tank[] = [];

    public get cpu(): Tank {
        if (this._cpu == null) {
            this._cpu = new Tank(this._position, this._name);
        }
        return this._cpu;
    }
    public set cpu(v: Tank) {
        this._cpu = v;
    }

    public temporalNotDefinitiveArray: string[];

    public cannonRotation: number = 50;

    public addPlayerToTrack(player: Tank) {
        this.players.push(player);
    }

    public trackTank() {
        let dx = this.players[0].position.y - this._position.y;
        let dy = this.players[0].position.x - this._position.x;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;

    }

    public shootBullet() {
        let realTargetPos: Position = {
            x: this.players[0].position.y + 25,
            y: this.players[0].position.x + 25
        }

        BulletController.shoot(this.bullet, this._position, realTargetPos, this.cannonRotation, "cpu", "cpuBullet"+0);
    }

    public getQuadrant(tank:any) {
        let posX = 0;
        let posY = 0;
        
        let w = GameMap.colliders[tank].right - GameMap.colliders[tank].left;
        let h = GameMap.colliders[tank].bottom - GameMap.colliders[tank].top;

        w = GameMap.colliders[tank].right - (w/2);
        h = GameMap.colliders[tank].bottom - (h/2);
        
        //debugger;
        for (const collider in GameMap.colliders) {
            if (!GameMap.colliders[collider].type.includes('cpu')) {
                var overlap = (w < GameMap.colliders[collider].right &&
                    w > GameMap.colliders[collider].left &&
                    h < GameMap.colliders[collider].bottom &&
                    h > GameMap.colliders[collider].top)       
                
                if (overlap && GameMap.colliders[collider].type != tank) {
                    return posX + "," + posY+ ","+ collider;
                }
    
                posX++;
                if (posX == 16) {
                    posY++;
                    posX = 0;
                }
            }
        }
        return "2,2,tumadre";
    }

    winRoute:string[] = [];
    tankPlayerQ:string = "";
    public pathfinding(cpu:DOMRect) {
        let map:number[][] = GameMap._map;
        let pathMap:string[][] = [];

        for (let i = 0; i < map.length; i++) {
            let row:string[] = [];
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0) {
                    row.push("X");
                } else {
                    row.push(" ");
                }
            }
            pathMap.push(row);
        }
        let tankCPUQ = "2,2";
        try {
            if (this.getQuadrant("player") == this.tankPlayerQ && this.cont < this.winRoute.length) {
                return
            }
            this.tankPlayerQ = this.getQuadrant("player");
            tankCPUQ = this.getQuadrant(this._name);
            //debugger;
        } catch (error) {
            
        }
        
        try {
            pathMap[Number.parseInt(this.tankPlayerQ.split(",")[1])][Number.parseInt(this.tankPlayerQ.split(",")[0])] = "O";
            pathMap[Number.parseInt(tankCPUQ.split(",")[1])][Number.parseInt(tankCPUQ.split(",")[0])] = "T";
        } catch (error) {
            debugger;
            pathMap[Number.parseInt(this.tankPlayerQ.split(",")[1])][Number.parseInt(this.tankPlayerQ.split(",")[0])] = "O";
            pathMap[Number.parseInt(tankCPUQ.split(",")[1])][Number.parseInt(tankCPUQ.split(",")[0])] = "T";
        }

        this.paintMap(pathMap);

        let nextToExpand: string[] = [];
        nextToExpand.push(tankCPUQ);

        let find: boolean = false;
        this.winRoute = [];

        let routeEndX: number = 0;
        let routeEndY: number = 0;

        let x: number = 0;
        let y: number = 0;
        let lleno = false;

        while (!find && !lleno) {
            
            let aux: string[] = [];
            for (let i = 0; i < nextToExpand.length && !find; i++) {
                x = Number.parseInt(nextToExpand[i].split(",")[0]);
                y = Number.parseInt(nextToExpand[i].split(",")[1]);
                find = this.expand(pathMap, aux, x, y, 1, 0, "R");
                if (!find) {
                    find = this.expand(pathMap, aux, x, y, 1, 0, "R");
                }
                if (!find) {
                    find = this.expand(pathMap, aux, x, y, -1, 0, "L");
                }
                if (!find) {
                    find = this.expand(pathMap, aux, x, y, 0, +1, "D");
                }
                if (!find) {
                    find = this.expand(pathMap, aux, x, y, 0, -1, "U");
                }
                routeEndX = x;
                routeEndY = y;
            }
            nextToExpand = aux;
            aux = [];

            lleno = true;
            for (let i = 0; i < pathMap.length; i++) {
                for (let j = 0; j < pathMap[i].length; j++) {
                    if (pathMap[i][j] == " ") {
                        lleno = false;
                    }
                }
                
            }
        }

        this.paintMap(pathMap);

        
        
        let reachT = false;
        while (!reachT) {
            this.winRoute.unshift(pathMap[y][x]);
            
            switch (pathMap[y][x]) {
                case "U":
                    y++;
                    break;
                case "D":
                    y--;
                    break;
                case "L":
                    x++;
                    break;
                case "R":
                    x--;
                    break;
                case "T":
                    reachT = true;
                    break;
            }
        }

        
        this.winRoute.shift();

        this.cont = 0;
        this.moveViaPath(cpu);
        this.callOnce = true;
        this.winRoute = [];
        
    }

    public expand(map:string[][],aux:string[], x:number, y:number, plusX:number, plusY:number, letter:string): boolean {
        if ((map[y+plusY][x+plusX] == " " || map[y+plusY][x+plusX] == "O")) {
            if (map[y+plusY][x+plusX] == "O") {
                //funcion para guardar ruta
                
                return true;
            } else {
                map[y+plusY][x+plusX] = letter
                aux.push((x+plusX)+","+(y+plusY));
                return false;
            }
        }
        return false;
    }
    
    
    public paintRoute(map:string[][], winRoute:string[], tposX:number, tposY:number) {
        for (let i = 0; i < winRoute.length; i++) {
            switch (winRoute[i]) {
                case "U":
                    tposX--;
                    break;
                case "D":
                    tposX++;
                    break;
                case "L":
                    tposY--;
                    break;
                case "R":
                    tposY++;
                    break;
            }
    
            map[tposX][tposY] = winRoute[i];
        }
    
    }
    
    public paintMap(map:string[][]) {
        for (let i = 0; i < map.length; i++) {
            let line:string = "";
            for (let j = 0; j < map[0].length; j++) {
                line += map[i][j];
            }
            
            line = "";
        }
    }

 muerto = false;
 cont:number = 0;
 callOnce = false;
    public async moveViaPath(cpu:DOMRect) {
        
        if (this.muerto || this.callOnce) {
            return;
        }
        this.winRoute.pop();
        for (this.cont = 0; this.cont < this.winRoute.length; this.cont++) {
            
            let step = this.winRoute[this.cont];

            
            //debugger;
            switch (step) {//U = L; L = U; R = D; D = R;
                case "U":
                    if (!GameMap.checkIfBotBlockV2(cpu, 0,0,TankController.tank.speed * -1,0, "cpu")) {
                        await this.cpu.moveYBot(this, TankController.tank.speed*-1);
                    } 
                    break;
                case "D":
                    if (!GameMap.checkIfBotBlockV2(cpu, 0,0,0,TankController.tank.speed * 1, "cpu")) {
                        await this.cpu.moveYBot(this, TankController.tank.speed*1);
                    } 
                    break;
                case "L":
                    if (!GameMap.checkIfBotBlockV2(cpu, TankController.tank.speed * -1,0,0,0, "cpu")) {
                        await this.cpu.moveXBot(this, TankController.tank.speed*-1);
                    } 
                    break;
                case "R":
                    if (!GameMap.checkIfBotBlockV2(cpu, 0,TankController.tank.speed * 1,0,0, "cpu")) {
                        await this.cpu.moveXBot(this, TankController.tank.speed*1);
                    } 
                    break;
            }
            await delay(100);

        }
        this.callOnce = false;
        this.cont = 0;
    }
    

    

}