import { CpuComponent } from "../components/cpu/cpu.component";
import { ReferenceRepository } from "../controllers/ReferenceRepository";

export interface MapPosition{
    x: number,
    y: number
}

export interface Position{
    x: number;
    y: number;
}

export class Collider{
    type: string
    left: number
    right: number
    top: number
    bottom: number
}

export interface Colliders{
    [x: string]: Collider;
}

export class GameMap {

    private tileTypes = ["Grass", "Water", "Mountain", "Woods"]
    private _width : number;
    private _height : number;
    public static _map:number[][] = [];
    public static colliders : Colliders = {};

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

        GameMap._map = map;

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
        
    }

    public static registerCollider(element:DOMRect, type: string){
        let collider: Collider = element.toJSON();
        collider.type = type;
        this.colliders[type] = collider;
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
    }
    
    public static checkIfBlockNullet(position: Position, x: number, y: number, owner: string,  bulletName: string) {
        
        for (const collider in this.colliders) {
            let collWidth: number = this.colliders[collider].right - this.colliders[collider].left;
            let collHeight: number = this.colliders[collider].bottom - this.colliders[collider].top;
            
            var overlap = !(position.x+x+(collWidth/2) < this.colliders[collider].left ||
                position.x+x > this.colliders[collider].right ||
                position.y+y+(collHeight/2) < this.colliders[collider].top ||
                position.y+y > this.colliders[collider].bottom)

            if (overlap && !this.colliders[collider].type.includes("floor") ) { //Poner aqui el que la bala se destruya si choca con otra bala o con un tanke
                let tumadre = this.colliders[collider].type;
                console.log(tumadre);
                if (tumadre.includes("Bullet")) {
                    
                    debugger;
                }
                if ((this.colliders[collider].type == "player" || this.colliders[collider].type == "cpu") || (this.colliders[collider].type != bulletName && this.colliders[collider].type.includes("Bullet"))) {
                    if (this.colliders[collider].type != owner && !this.colliders[collider].type.includes("Bullet"))  {
                        //debugger;
                        
                        console.log("PA ELIMINA MI PANA");
                        
                        console.log(this.colliders[collider].type);
                        console.log(owner);
                        console.log(bulletName);
                        
                        ReferenceRepository.Component[this.colliders[collider].type].destroy();
                        const { [collider]: g, ...otro} = this.colliders;
                        this.colliders = otro;
                        clearInterval(CpuComponent.cpuShoot);
                    } else if (this.colliders[collider].type.includes("Bullet")) {
                        console.log("Choque con bala");
                        debugger;
                        position = {
                            x: -0,
                            y: -30
                        }
                    }

                    // supertecnica disparo cascadaaaaaaaa
                } else {                

                    let colliCenter: Position =  {
                        x: this.colliders[collider].right - (collWidth/2),
                        y: this.colliders[collider].top + (collHeight/2)
                    };  
                    
                    let diff: Position = {
                        x: 0,
                        y: 0
                    };                  
                    
                    if (position.x >= colliCenter.x) {
                        if ((position.x - colliCenter.x) < Math.abs(x)) {
                            
                            diff.x = position.x - colliCenter.x;
                        } else {
                            
                            diff.x = Math.abs((position.x-x) - colliCenter.x)
                            if (diff.x > collWidth/2) {
                                
                                diff.x = Math.abs((position.x-Math.abs(x)) - colliCenter.x)
                            }
                        }         
                    } else {
                        if ((colliCenter.x - position.x) < Math.abs(y)) {
                            diff.x = colliCenter.x - position.x;
                        } else {
                            diff.x = Math.abs(colliCenter.x - (position.x+x));
                            if (diff.x > collWidth/2) {
                                diff.x = Math.abs(colliCenter.x - (position.x+Math.abs(x)));
                            }
                        }
                    }
                    
                    if (position.y+y >= colliCenter.y) {
                        if ((position.y - colliCenter.y) < collHeight/2) {
                            diff.y = position.y - colliCenter.y;
                        } else {
                            diff.y = Math.abs((position.y-y) - colliCenter.y)
                            if (diff.y > collHeight/2) {
                                diff.y = Math.abs((position.y-Math.abs(y)) - colliCenter.y)
                            }
                        } 
                    } else {
                        if ((colliCenter.y - position.y) < collHeight/2) {
                            diff.y = colliCenter.y - position.y;
                        } else {
                            diff.y = Math.abs(colliCenter.y - (position.y+y));
                            if (diff.y > collWidth/2) {
                                diff.y = Math.abs(colliCenter.y - (position.y+Math.abs(y)));
                            }
                        }
                    }
                    
                    if (diff.x > diff.y) {
                        return [true,true];
                    } else {
                        return [true, false]
                    }
                }
              
            }
        }
        return [false,false];
    }
    

    public static checkIfBlockV2(tank: DOMRect, up:number, down:number, left:number, right:number, owner:string) {
        for (const collider in this.colliders) {
            var overlap = !(tank.right+right < this.colliders[collider].left ||
                tank.left+left > this.colliders[collider].right ||
                tank.bottom+down < this.colliders[collider].top ||
                tank.top+up > this.colliders[collider].bottom)
                
            if (overlap && this.colliders[collider].type != owner && !this.colliders[collider].type.includes("floor") && !this.colliders[collider].type.includes(owner)) {
                return true;
            }
        }
        return false;
    }
    




}