// import { log } from "console";

import { log } from "console";
import { Position } from "./Tank";

export interface MapPosition{
    x: number,
    y: number
}

class Tile{
  
    private _pos : MapPosition;
    
    public value : number | string;
    
    
    constructor(pos:MapPosition, stateNumber:number){
        this._pos = pos;
        this.value = stateNumber;
    }

    public get pos() : MapPosition {
        return this._pos;
    }
    public set pos(v : MapPosition) {
        this._pos = v;
    }
    
}


export class GameMap {

    private tileTypes = ["Grass", "Water", "Mountain", "Woods"]
    private _width : number;
    private _height : number;
    public static _map:number[][] = [];

    public static blocksPos:MapPosition[][] = [];
    
    // TODO: generate map using wave function collapse
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height; 
    }

    public static position: MapPosition = {
        x: 0,
        y: 130
    };

    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }
    
    public get width() : number {
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }
    
    public static createMap(random:boolean) {
        
        let map = GameMap._map;
        
        if (random) {
            map = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,1,1,1,0,0,0,2,2,0,0,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
                [0,1,1,1,0,0,0,2,2,0,0,0,1,1,1,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        } else {
            GameMap.aleatMapGenerator(map);
        }

        let posx:number = -50;
        let posy:number = 100;

        this.blocksPos = [];

        for (let i = 0; i < map.length; i++) {
            posy=100;
            posx+=50;
            let row:MapPosition[] = [];
            for (let j = 0; j < map[i].length; j++) {
                posy+=50;
                if (map[i][j] == 0) {
                    row.push({x:posy,y:posx})
                }
                
            }
            this.blocksPos.push(row);
        }
        console.log(this.blocksPos);
        

        let imgs = [];
        let terrains:string[] = ["wall.png", "floor.jpg", "dirt.jpg"];
        for (let i = 0; i < map.length; i++) {
            let row = [];
            for (let j = 0; j < map[i].length; j++) {
                row[j] = terrains[map[i][j]]
            }
            imgs[i] = row;
        }

        return imgs;        

    }

    public createColliders(map:number[][]) {
        let colli:number[][][] = [];
        for (let i = 0; i < map.length; i++) {
            let row:number[][] = [];
            for (let j = 0; j < map[i].length; j++) {
                let lrud:number[] = []
                if (map[i][j-1] != 0) {
                    lrud.push(1);
                } else {
                    lrud.push(0);
                }
                if (map[i][j+1] != 0) {
                    lrud.push(1);
                } else {
                    lrud.push(0);
                }
                if (map[i-1][j] != 0) {
                    lrud.push(1);
                } else {
                    lrud.push(0);
                }
                if (map[i+1][j-1] != 0) {
                    lrud.push(1);
                } else {
                    lrud.push(0);
                }
                row.push(lrud);
            }
            colli.push(row);
        }
        console.log(colli);
        
    }

    public static aleatMapGenerator(map:number[][]) {
        for (let i = 0; i < 24; i++) {
            let row:number[] = [];
            for (let j = 0; j < 16; j++) {
                
                if (i == 0 || j == 0 || j == 15 || i == 23) {
                    row[j] = 0;
                } else {
                    row[j] = Math.floor(Math.random()*4);
                    if (row[j] == 3) {
                        row[j] = 1
                    }
                }
                
            }
            map[i] = row
            
        
        }
        console.log(GameMap.blocksPos);
    }

    public static checkIfBlock(x:number, y:number, position:Position) {
        // console.log(GameMap.blocksPos);
        
        for (let i = 0; i < GameMap.blocksPos.length; i++) {
            for (let j = 0; j < GameMap.blocksPos[i].length; j++) {
                if (x > 0) {
                    if ((position.x + 50 + x > GameMap.blocksPos[i][j].x && position.x + 50 + x < GameMap.blocksPos[i][j].x+50) && (position.y+50 >= GameMap.blocksPos[i][j].y && position.y <= GameMap.blocksPos[i][j].y + 50)) {
                        // console.log(position.x);
                        // console.log(GameMap.blocksPos[i][j].x);
                        // console.log(i + "," + j);
                        
                        return false;
                    }
                } else if (x < 0) {
                    if ((position.x + x >= GameMap.blocksPos[i][j].x && position.x + x < GameMap.blocksPos[i][j].x+55) && (position.y >= GameMap.blocksPos[i][j].y && position.y <= GameMap.blocksPos[i][j].y + 60)) {
                        console.log(position.x);
                        console.log(GameMap.blocksPos[i][j].x);
                        console.log(i + "," + j);
                        
                        return false;
                    }
                }

                if (y > 0) {
                    if ((position.y + 50 + y > GameMap.blocksPos[i][j].y && position.y + 50 + y < GameMap.blocksPos[i][j].y+50) && (position.x+50 >= GameMap.blocksPos[i][j].x && position.x <= GameMap.blocksPos[i][j].x + 50)) {
                        // console.log(position.x);
                        // console.log(GameMap.blocksPos[i][j].x);
                        // console.log(i + "," + j);
                        
                        return false;
                    }
                } else if (y < 0) {
                    if ((position.y + y >= GameMap.blocksPos[i][j].y && position.y + y < GameMap.blocksPos[i][j].y+55) && (position.x >= GameMap.blocksPos[i][j].x && position.x <= GameMap.blocksPos[i][j].x + 60)) {
                        console.log(position.x);
                        console.log(GameMap.blocksPos[i][j].x);
                        console.log(i + "," + j);
                        
                        return false;
                    }
                }

                
                
                
            }
            
        }
        return true;
    }

}