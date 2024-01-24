import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";
import { Position } from "../../models/Tank";

@Component({
    selector: 'app-tank',
    standalone: true,
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.css'],
    imports: [ CommonModule, CannonComponent ]
})
export class TankComponent implements OnInit {
    IGameController = GameController;
    ITankController = TankController;

    constructor() { }

    ngOnInit() {
        GameController.addToGameLoop(TankController.Move);
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent){
        TankController.addKey(e.key)
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(e: KeyboardEvent){
        TankController.removeKey(e.key)
    }

    setDivStyles(){
        return {
            "position": 'absolute',
            "width": 45,
            "height": 45,
            "top": TankController.tank.position.x,
            "left": TankController.tank.position.y,
            "rotate": `${TankController.tank.rotation}deg`,
            "display": 'flex',
            "justifyContent": 'center',
            "alignItems": 'center',
            "border": '1px solid green'
        }
    }

    setImgStyles(){
        return {
            "position": 'absolute',
            "width": 45,
            "height": 45,
            "zIndex": 50,
            "rotate": `${TankController.tank.rotation}deg`,
            "border": '1px solid red'
        }
    }

}
