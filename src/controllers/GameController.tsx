export class GameController {

    private static fps: number = 24;

    private static gameLoop: any = null; 
    
    private static _updatable : (()=>any)[] = [];


    public static get updatable() : (()=>any)[] {
        return this._updatable;
    }
    

    public static addToGameLoop(func:()=>any){
        console.log(`${func.name} añadido al loop`);
        
        this._updatable.push(func);
        this.stopUpdate();
        this.InitialiseUpdate();
    }
    

    public static InitialiseUpdate() {
        this.gameLoop = setInterval(() => {
            this._updatable.forEach(func=>{
                func();
            })
        }, (1000 / this.fps))
    }

    public static stopUpdate(){
        clearInterval(this.gameLoop);
    }
}