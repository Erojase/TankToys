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
    private _map : Tile[][] = [];
    
    // TODO: generate map using wave function collapse
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }
    
    public get map() : Tile[][] {
        return this._map;
    }
    public set map(v : Tile[][]) {
        this._map = v;
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

    initialiseMap(){
        this._map = [];
        let tmpMap = [];
        for (let x = 0; x < this._width; x++) {
            tmpMap = [];
            for (let y = 0; y < this._height; y++) {
                tmpMap.push(new Tile({x: x, y: y}, this.tileTypes.length));
            }
            this._map.push(tmpMap);
        }
        return this;
    }

    generateMap(){
        let initialTile = this.getRandomTile(this._map);
        initialTile.value = this.setRandomTileType();
        this.nextTile(initialTile);       
    }

    setRandomTileType(){
        let res = Math.floor(Math.random()*this.tileTypes.length)
        return this.tileTypes[res];
    }

    nextTile(tile:Tile){
        
    }
    
    getRandomTile<T>(array:T[][]){
        let ax1 =  Math.floor(Math.random()*array.length);
        let ax2 = Math.floor(Math.random()*array[ax1].length)
        return array[ax1][ax2];
    }

    getLowestTile(array:Tile[]){
        let low:Tile = new Tile({x:0,y:0}, array.length);
        array.forEach(elem => {
            if (typeof(elem.value) === "number" && typeof(low.value) === "number") {
                if (elem.value < low.value) {
                    low = elem;
                }
            }
        });
        return low;
    }

    public static createMap() {
        let map:number[][] = [];

        let terrains:string[] = ["Wall", "Floor", "Dirt"];

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

        for (let i = 0; i < map.length; i++) {
            let txt = "";
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] != 0) {
                    txt += " ";
                } else {
                    txt += map[i][j];
                }
                txt += " ";
            }
            console.log(txt);
            
            
        }

        console.log("map");
        

    }

}