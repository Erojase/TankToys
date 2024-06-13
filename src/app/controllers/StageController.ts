import Swal from "sweetalert2";
import { MainCanvasComponent } from "../components/mainCanvas/mainCanvas.component";
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
            pos4: { position: { x: 4.5, y: 7 }, available: true },
            pos5: { position: { x: 2, y: 2 }, available: true }
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
            pos2: { position: { x: 2, y: 1.4 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 3, y: 2 }, available: true },
            pos5: { position: { x: 2, y: 3 }, available: true }
        }
    }
]

export class StageController {

    static currentStage: Stage = { ...StagesDefinition[0] };
    static reloadCallback: MainCanvasComponent;

    static Init(reloadCallback: MainCanvasComponent) {
        if (StageController.reloadCallback == undefined || StageController.reloadCallback == null) {
            StageController.reloadCallback = reloadCallback;
            // StageController.currentStage = { ...StagesDefinition[0] };
        }
    }

    static async killEnemy() {
        StageController.currentStage.enemies--;
        StageController.CheckWin();
    }

    static lose() {
        // StageController.currentStage = { ...StagesDefinition[0] };
        StageController.reloadCallback.loose();
    }

    static nextStage() {
        if (StagesDefinition[StageController.currentStage.id + 1] != undefined) {
            StageController.currentStage = { ...StagesDefinition[StageController.currentStage.id + 1] }
        }
    }

    static async CheckWin(): Promise<boolean> {
        if (StageController.currentStage.enemies <= 0) {
            // alert(`${StageController.currentStage.name} superada`)
            let res = await Swal.fire({
                title: `${StageController.currentStage.name} superada`,
                icon: "success"
            });
            if (res.isConfirmed) {
                StageController.nextStage();
                StageController.reloadCallback.initializeSingleplayer();
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}