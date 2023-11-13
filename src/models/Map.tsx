export class Map {

    
    private _width : number;
    
    private _height : number;
    
    
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
}