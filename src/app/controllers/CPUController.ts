import { Bullet } from '../models/Bullet';
import { Collider, GameMap } from "../models/Map";
import { Position, Tank } from '../models/Tank';
import { BulletController } from './BulletController';
import { TankController } from './TankController';
import { delay } from '../utils/utils';

export class CPUController {
    
    private static position: Position = {
        x: 500,
        y: 650
    }

    private static _cpu: Tank;

    public static bullet: Bullet;

    private static players: Tank[] = [];

    public static get cpu(): Tank {
        if (this._cpu == null) {
            this._cpu = new Tank(this.position);
        }
        return this._cpu;
    }
    public static set cpu(v: Tank) {
        this._cpu = v;
    }

    public static temporalNotDefinitiveArray: string[];

    public static cannonRotation: number = 50;

    public static addPlayerToTrack(player: Tank) {
        this.players.push(player);
    }

    public static trackTank() {
        let centerX = 500;
        let centerY = 575;

        
        
        

        // this.scopePos = { x: e.pageX, y: e.pageY }
        let dx = this.players[0].position.y - this.position.y;
        let dy = this.players[0].position.x - this.position.x;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;

    }

    public static shootBullet() {
        let realTargetPos: Position = {
            x: this.players[0].position.y + 25,
            y: this.players[0].position.x + 25
        }

        BulletController.shoot(this.bullet, this.position, realTargetPos, this.cannonRotation, "cpu", "cpuBullet"+0);
    }

    public static getQuadrant(tank:any) {

        let posX = -1;
        let posY = 0;
        
        let w = GameMap.colliders[tank].right - GameMap.colliders[tank].left;
        let h = GameMap.colliders[tank].bottom - GameMap.colliders[tank].top;

        w = GameMap.colliders[tank].right - (w/2);
        h = GameMap.colliders[tank].bottom - (h/2);
        

        for (const collider in GameMap.colliders) {
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
        return "2,2,tumadre";
    }

    static winRoute:string[] = [];
    static tankPlayerQ:string = "";
    public static pathfinding(cpu:DOMRect) {
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
            if (CPUController.getQuadrant("player") == this.tankPlayerQ && this.cont < this.winRoute.length) {
                return
            }
            this.tankPlayerQ = CPUController.getQuadrant("player");
            tankCPUQ = CPUController.getQuadrant("cpu");
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

        CPUController.paintMap(pathMap);

        let tposX = Number.parseInt(tankCPUQ.split(",")[0]);
        let tposY = Number.parseInt(tankCPUQ.split(",")[1]);

        let nextToExpand: string[] = [];
        nextToExpand.push(tankCPUQ);

        let find: boolean = false;
        CPUController.winRoute = [];

        let routeEndX: number = 0;
        let routeEndY: number = 0;

        let x: number = 0;
        let y: number = 0;

        while (!find) {
            let aux: string[] = [];
            for (let i = 0; i < nextToExpand.length && !find; i++) {
                x = Number.parseInt(nextToExpand[i].split(",")[0]);
                y = Number.parseInt(nextToExpand[i].split(",")[1]);
                find = CPUController.expand(pathMap, aux, x, y, 1, 0, "R");
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, 1, 0, "R");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, -1, 0, "L");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, 0, +1, "D");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, 0, -1, "U");
                }
                routeEndX = x;
                routeEndY = y;
            }
            nextToExpand = aux;
            aux = [];
        }

        CPUController.paintMap(pathMap);

        
        
        let reachT = false;
        while (!reachT) {
            CPUController.winRoute.unshift(pathMap[y][x]);

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

        
        CPUController.winRoute.shift();
        

        this.cont = 0;
        CPUController.moveViaPath(cpu);
        this.callOnce = true;
        CPUController.winRoute = [];
        
    }

    public static expand(map:string[][],aux:string[], x:number, y:number, plusX:number, plusY:number, letter:string): boolean {
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
    
    
    public static paintRoute(map:string[][], winRoute:string[], tposX:number, tposY:number) {
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
    
    public static paintMap(map:string[][]) {
        for (let i = 0; i < map.length; i++) {
            let line:string = "";
            for (let j = 0; j < map[0].length; j++) {
                line += map[i][j];
            }
            
            line = "";
        }
    }

    static muerto = false;
    static cont:number = 0;
    static callOnce = false;
    public static async moveViaPath(cpu:DOMRect) {
        if (this.muerto || this.callOnce) {
            return;
        }
        for (CPUController.cont = 0; CPUController.cont < CPUController.winRoute.length; CPUController.cont++) {
            
            let step = this.winRoute[this.cont];

            
            //debugger;
            switch (step) {//U = L; L = U; R = D; D = R;
                case "U":
                    if (!GameMap.checkIfBlockV2(cpu, 0,0,TankController.tank.speed * -1,0, "cpu")) {
                    } 
                    await CPUController.cpu.moveYBot(TankController.tank.speed*-1);
                    break;
                case "D":
                    if (!GameMap.checkIfBlockV2(cpu, 0,0,0,TankController.tank.speed * 1, "cpu")) {
                    } 
                    await CPUController.cpu.moveYBot(TankController.tank.speed*1);
                    break;
                case "L":
                    if (!GameMap.checkIfBlockV2(cpu, TankController.tank.speed * -1,0,0,0, "cpu")) {
                    } 
                    await CPUController.cpu.moveXBot(TankController.tank.speed*-1);
                    break;
                case "R":
                    if (!GameMap.checkIfBlockV2(cpu, 0,TankController.tank.speed * 1,0,0, "cpu")) {
                    } 
                    await CPUController.cpu.moveXBot(TankController.tank.speed*1);
                    break;
            }
            await delay(100);

        }
        this.callOnce = false;
    }
    

    

}