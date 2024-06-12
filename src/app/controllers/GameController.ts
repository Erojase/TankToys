interface IUpdatable{
    [key:string]: ()=>any
}

export class GameController {

    private static running:boolean = false;
    
    private static _updatable : IUpdatable = {};

    public static isSingleplayer : boolean = false;

    public static get updatable() : IUpdatable {
        return this._updatable;
    }
    

    public static addToGameLoop(funcId:string, func:()=>any) {
        if (this._updatable[funcId] == null || this._updatable[funcId] == undefined) {
            this._updatable[funcId] = func;
            console.log(`${funcId} añadido al loop`);
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
        Object.keys(this._updatable).forEach(funcId=>{
            this._updatable[funcId]();
        })
        if (this.running) {
            setTimeout(() => {
                this.Update();
            }, 24);
        }
    }

    public static removeFromUpdate(funcId:string){
        delete this._updatable[funcId];
    }

    public static stopUpdate(){
        this.running = false;
    }
}