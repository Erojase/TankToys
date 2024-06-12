
export interface Stage{
    enemies: number
}

const StagesDefinition: Stage[] = [
    {
        enemies: 1
    }
]

export class StageController {

    static currentStage: Stage = StagesDefinition[0];

    
    static Init(){
        this.currentStage = StagesDefinition[0];
    }
}