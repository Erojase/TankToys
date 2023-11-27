import { log } from "console";

interface Position{
    x: number,
    y: number
}

class Tile{
  
    private _pos : Position;
    
    public value : number | string;
    
    
    constructor(pos:Position, stateNumber:number){
        this._pos = pos;
        this.value = stateNumber;
    }

    public get pos() : Position {
        return this._pos;
    }
    public set pos(v : Position) {
        this._pos = v;
    }
    
}


export class GameMap {

    private tileTypes = ["Grass", "Water", "Mountain", "Woods"]
    private _width : number;
    private _height : number;
    public static _map:number[][] = [];
    
    // TODO: generate map using wave function collapse
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

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
    
    public static createMap() {
        
        let map = GameMap._map;
        

        for (let i = 0; i < 16; i++) {
            let row:number[] = [];
            for (let j = 0; j < 24; j++) {
                
                if (i == 0 || j == 0 || i == 15 || j == 23) {
                    row[j] = 0;
                } else {
                    row[j] = Math.floor(Math.random()*3);
                }
                
            }
            map[i] = row
            
        }


        let imgs = [];
        let terrains:string[] = ["wall.jpg", "floor.jpg", "dirt.jpg"];
        for (let i = 0; i < map.length; i++) {
            let row = [];
            for (let j = 0; j < map[i].length; j++) {
                row[j] = terrains[map[i][j]]
                
            }
            imgs[i] = row;
        }

        return imgs;

        // for (let i = 0; i < map.length; i++) {
        //     let txt = "";
        //     for (let j = 0; j < map[i].length; j++) {
        //         if (map[i][j] != 0) {
        //             txt += " ";
        //         } else {
        //             txt += map[i][j];
        //         }
        //         txt += " ";
        //     }
        //     console.log(txt);
            
            
        // }

        // console.log("map");
        

    }

}