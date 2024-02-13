
export interface MapPosition{
    x: number,
    y: number
}

export interface Position{
    x: number;
    y: number;
}

export class Collider{
    type: "wall" | null
    left: number
    right: number
    top: number
    bottom: number
}

export class GameMap {

    private tileTypes = ["Grass", "Water", "Mountain", "Woods"]
    private _width : number;
    private _height : number;
    public static _map:number[][] = [];
    public static colliders : Collider[] = [];

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
        let collider:number[][][] = [];
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
            collider.push(row);
        }
        console.log(collider);
        
    }

    public static registerCollider(element:DOMRect){
        let collider: Collider = {
            type : "wall",
            bottom: element.bottom,
            left: element.left,
            right: element.right,
            top: element.top
        }
        this.colliders.push(collider);
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

    public static checkIfBlock(tank: DOMRect) {
        for (const collider of this.colliders) {
            var overlap = !(tank.right < collider.left ||
                tank.left > collider.right ||
                tank.bottom < collider.top ||
                tank.top > collider.bottom)
            if (overlap) {
                console.group("overlap");
                console.log(collider);
                console.groupEnd();
                
                return true;
            }
        }
        return false;
    }
    public static checkIfBlockV2(tank: DOMRect, up:number, down:number, left:number, right:number) {
        for (const collider of this.colliders) {
            var overlap = !(tank.right+right < collider.left ||
                tank.left+left > collider.right ||
                tank.bottom+down < collider.top ||
                tank.top+up > collider.bottom)
                
            if (overlap) {
                console.group("overlap");
                console.log(collider);
                console.groupEnd();
                
                return true;
            }
        }
        return false;
    }
    



}