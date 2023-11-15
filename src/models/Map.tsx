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

    private tiles = ["grass", "water", "mountain", "woods"];
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
                tmpMap.push(new Tile({x: x, y: y}, this.tiles.length));
            }
            this._map.push(tmpMap);
        }
        return this;
    }

    generateMap(){
        let initialTile = this._map[Math.floor(Math.random()*this._map.length+1)][Math.floor(Math.random()*this._map.length+1)];
        initialTile.value = this.getRandomTile(this._map);
        this.nextTile(initialTile);
    }

    nextTile(tile:Tile){
        this._map[tile.pos.x +1][tile.pos.y +1];
        this._map[tile.pos.x -1][tile.pos.y -1];
        this._map[tile.pos.x +1][tile.pos.y -1];
        this._map[tile.pos.x -1][tile.pos.y +1];
    }

    getRandomTile(array:any[]){
        return Math.floor(Math.random()*array.length+1);
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
}