import { Position } from "../models/Map";
import { Maplist } from "../models/MapList";

interface AvailablePositions {
    [x: string]: { position: Position, available: boolean }
}

export interface Stage {
    id: number;
    name: string;
    enemies: number;
    map: number[][];
    availablePositions: AvailablePositions
}

const StagesDefinition: Stage[] = [
    {
        id: 0,
        name: "Stage 1",
        enemies: 1,
        map: Maplist.BasicMap,
        availablePositions: {
            pos1: { position: { x: 7, y: 4.5 }, available: true },
            pos2: { position: { x: 2, y: 1.2 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 2.6, y: 2 }, available: true },
            pos5: { position: { x: 2.6, y: 2 }, available: true }
        }
    },
    {
        id: 1,
        name: "Stage 2",
        enemies: 4,
        map: Maplist.Maze,
        availablePositions: {
            pos1: { position: { x: 4, y: 4.5 }, available: true },
            pos2: { position: { x: 2, y: 1.4 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 3, y: 2 }, available: true },
            pos5: { position: { x: 2, y: 3 }, available: true }
        }
    },
    {
        id: 2,
        name: "Stage 3",
        enemies: 4,
        map: Maplist.TactiCool,
        availablePositions: {
            pos1: { position: { x: 4, y: 4.5 }, available: true },
            pos2: { position: { x: 1.5, y: 1.2 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 2.6, y: 2 }, available: true },
            pos5: { position: { x: 2.6, y: 2 }, available: true }
        }
    }
]

export class StageController {

    static currentStage: Stage = { ...StagesDefinition[1] };


    static Init() {
        this.currentStage = { ...StagesDefinition[1] };
    }

    static killEnemy() {
        this.currentStage.enemies--;
        this.CheckWin();
    }

    static lose() {
        this.currentStage = { ...StagesDefinition[0] };
    }

    static nextStage() {
        if (StagesDefinition[this.currentStage.id + 1] != undefined) {
            this.currentStage = { ...StagesDefinition[this.currentStage.id + 1] }
        }
    }

    static CheckWin(): boolean {
        if (this.currentStage.enemies <= 0) {
            alert("ganaste wey")
            this.nextStage();
            return true;
        }
        return false;
    }
}