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
        name: "Entrenamiento",
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
        name: "Laberinto",
        enemies: 2,
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
        name: "Tres son multitud",
        enemies: 3,
        map: Maplist.TactiCool,
        availablePositions: {
            pos1: { position: { x: 4, y: 4.5 }, available: true },
            pos2: { position: { x: 2, y: 1.4 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 3, y: 2 }, available: true },
            pos5: { position: { x: 2, y: 3 }, available: true }
        }
    },
    {
        id: 3,
        name: "Castillo",
        enemies: 4,
        map: Maplist.Pvp,
        availablePositions: {
            pos1: { position: { x: 4, y: 4.5 }, available: true },
            pos2: { position: { x: 2, y: 1.4 }, available: true },
            pos3: { position: { x: 2.6, y: 2 }, available: true },
            pos4: { position: { x: 3, y: 2 }, available: true },
            pos5: { position: { x: 2, y: 3 }, available: true }
        }
    },
    {
        id: 4,
        name: "Cementerio",
        enemies: 5,
        map: Maplist.TombOfTheUndead,
        availablePositions: {
            pos1: { position: { x: 7, y: 4.5 }, available: true },
            pos2: { position: { x: 2.1, y: 1.5 }, available: true },
            pos3: { position: { x: 2.1, y: 2.7 }, available: true },
            pos4: { position: { x: 3.5, y: 2.7 }, available: true },
            pos5: { position: { x: 3, y: 3.1 }, available: true },
            pos6: { position: { x: 5, y: 2.7 }, available: true }
        }
    },
    
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

    static async lose() {
        // StageController.currentStage = { ...StagesDefinition[0] };
        await Swal.fire({
            title: `${StageController.currentStage.name} no superada`,
            icon: "error"
        })
        StageController.reloadCallback.loose();
    }

    static nextStage() {
        if (StagesDefinition[StageController.currentStage.id + 1] != undefined) {
            StageController.currentStage = { ...StagesDefinition[StageController.currentStage.id + 1] }
        } else {
            StageController.fullWin();
        }
    }

    static async fullWin(){
        await Swal.fire({
            title: `Bravo! Llegaste hasta el final`,
            icon: "success"
        })
        StageController.reloadCallback.loose();
    }

    static async CheckWin(): Promise<boolean> {
        if (StageController.currentStage.enemies <= 0) {
            // alert(`${StageController.currentStage.name} superada`)
            let res = await Swal.fire({
                title: `${StageController.currentStage.name} superada`,
                icon: "success"
            });
            if (!res.isDenied) {
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