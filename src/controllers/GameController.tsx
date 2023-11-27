export class GameController {

    private static running:boolean = false;

    private static fps: number = 24; 
    
    private static _updatable : (()=>any)[] = [];


    public static get updatable() : (()=>any)[] {
        return this._updatable;
    }
    

    public static addToGameLoop(func:()=>any){
        if (!this._updatable.includes(func)) {
            this._updatable.push(func);
            console.log(`${func.name} añadido al loop`);
        }
    }
    

    public static InitialiseUpdate() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.Update();
    }

    public static Update(){
        this._updatable.forEach(func=>{
            func();
        })
        if (this.running) {
            setTimeout(() => {
                this.Update();
            }, this.fps);
        }
    }

    public static stopUpdate(){
        this.running = false;
    }
}