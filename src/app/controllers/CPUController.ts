import { Bullet } from '../models/Bullet';
import { Collider, GameMap } from "../models/Map";
import { Position, Tank } from '../models/Tank';
import { BulletController } from './BulletController';
import { TankController } from './TankController';

export class CPUController {
    private static _cpu: Tank = new Tank;

    private static position: Position = {
        x: 500,
        y: 575
    }

    public static bullet: Bullet;

    private static players: Tank[] = [];

    public static get cpu(): Tank {
        return this._cpu;
    }
    public static set tank(v: Tank) {
        this._cpu = v;
    }

    public static cannonRotation: number = 50;

    public static addPlayerToTrack(player: Tank) {
        console.log("tumadre un tanke");

        console.log(player);

        this.players.push(player);
    }

    public static trackTank() {
        let centerX = 500;
        let centerY = 575;

        // this.scopePos = { x: e.pageX, y: e.pageY }
        let dx = this.players[0].position.y - centerY;
        let dy = this.players[0].position.x - centerX;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = theta;

    }

    public static shootBullet() {
        console.log("CPUShoot");

        console.log(this.players[0].position);
        let realTargetPos: Position = {
            x: this.players[0].position.y + 25,
            y: this.players[0].position.x + 25
        }

        BulletController.shoot(this.bullet, this.position, realTargetPos, this.cannonRotation, "cpu");
    }

    public static getQuadrant(tank:any) {

        let posX = 0;
        let posY = 0;

        for (const collider in GameMap.colliders) {
            var overlap = !(GameMap.colliders[tank].right < GameMap.colliders[collider].left ||
                GameMap.colliders[tank].left > GameMap.colliders[collider].right ||
                GameMap.colliders[tank].bottom < GameMap.colliders[collider].top ||
                GameMap.colliders[tank].top > GameMap.colliders[collider].bottom)

            if (overlap && GameMap.colliders[tank].type != tank) {
                console.group("overlap");
                console.log(GameMap.colliders[collider]);
                console.groupEnd();



                return posX + "," + posY;
            }

            posX++;
            if (posX == 24) {
                posY++;
                posX = 0;
            }
        }
        return "2,2";
    }

    public static pathfinding() {
        let map:number[][] = GameMap._map;
        let pathMap:String[][] = [];

        for (let i = 0; i < map.length; i++) {
            let row:String[] = [];
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0) {
                    row.push("X");
                } else {
                    row.push(" ");
                }
            }
            pathMap.push(row);
        }

        let tankPlayerQ = CPUController.getQuadrant("player");
        let tankCPUQ = CPUController.getQuadrant("cpu");

        pathMap[Number.parseInt(tankPlayerQ.split(",")[1])][Number.parseInt(tankPlayerQ.split(",")[0])] = "T";
        pathMap[Number.parseInt(tankCPUQ.split(",")[1])][Number.parseInt(tankCPUQ.split(",")[0])] = "T";



        let nextToExpand: String[] = [];
        nextToExpand.push(tankPlayerQ);

        let find: boolean = false;
        let winRoute: String[] = [];

        let routeEndX: number = 0;
        let routeEndY: number = 0;

        let x: number = 0;
        let y: number = 0;

        while (!find) {
            let aux: String[] = [];
            for (let i = 0; i < nextToExpand.length && !find; i++) {
                x = Number.parseInt(nextToExpand[i].split(",")[0]);
                y = Number.parseInt(nextToExpand[i].split(",")[1]);
                find = CPUController.expand(pathMap, aux, x, y, 1, 0, "D");
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, -1, 0, "D");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, -1, 0, "U");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, 0, +1, "R");
                }
                if (!find) {
                    find = CPUController.expand(pathMap, aux, x, y, 0, -1, "L");
                }
                routeEndX = x;
                routeEndY = y;
            }
            nextToExpand = aux;
            aux = [];
        }

        let reachT = false;
        while (!reachT) {
            winRoute.unshift(pathMap[x][y]);
            switch (pathMap[x][y]) {
                case "U":
                    x++;
                    break;
                case "D":
                    x--;
                    break;
                case "L":
                    y++;
                    break;
                case "R":
                    y--;
                    break;
                case "T":
                    reachT = true;
                    break;
            }
        }

        console.log(winRoute);

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (pathMap[i][j] != "X" && pathMap[i][j] != "T" && pathMap[i][j] != "O") {
                    pathMap[i][j] = " ";
                }
            }

        }

        // CPUController.paintMap(map);
        // paintRoute(map, winRoute, tposX, tposY);
        // CPUController.paintMap(map);

    }

    public static expand(map:String[][],aux:String[], x:number, y:number, plusX:number, plusY:number, letter:String): boolean {
        if ((map[x+plusX][y+plusY] == " " || map[x+plusX][y+plusY] == "O")) {
            if (map[x+plusX][y+plusY] == "O") {
                //funcion para guardar ruta
                
                return true;
            } else {
                map[x+plusX][y+plusY] = letter
                aux.push((x+plusX)+","+(y+plusY));
                return false;
            }
        }
        return false;
    }
    
    
    public static paintRoute(map:String[][], winRoute:String[], tposX:number, tposY:number) {
        for (let i = 1; i < winRoute.length; i++) {
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
    
    public static paintMap(map:String[][]) {
        for (let i = 0; i < map.length; i++) {
            let line:string = "";
            for (let j = 0; j < map[0].length; j++) {
                line += map[i][j];
            }
            console.log(line);
            line = "";
        }
    }

}