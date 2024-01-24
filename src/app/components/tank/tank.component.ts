import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";
import { Position } from "../../models/Tank";

interface TankComponentProps {
    width: number;
    heigth: number;
    position: Position;
    rotation: number;
}

@Component({
    selector: 'app-tank',
    standalone: true,
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.css'],
    imports: [ CommonModule ]
})
export class TankComponent implements OnInit {
    @Input() props: TankComponentProps;

    IGameController = GameController;
    ITankController = TankController;


    constructor() { }

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent){
        TankController.addKey(e.key), { once: true }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(e: KeyboardEvent){
        TankController.removeKey(e.key), { once: true }
    }

    setDivStyles(){
        return {
            "position": 'absolute',
            "width": this.props.width,
            "height": this.props.heigth,
            "top": this.props.position.x,
            "left": this.props.position.y,
            "rotate": `${this.props.rotation}deg`,
            "display": 'flex',
            "justifyContent": 'center',
            "alignItems": 'center',
            "border": '1px solid green'
        }
    }

    setImgStyles(){
        return {
            "position": 'absolute',
            "width": this.props.width,
            "height": this.props.heigth,
            "zIndex": 50,
            "rotate": `${this.props.rotation}deg`,
            "border": '1px solid red'
        }
    }

    ngOnInit() {
        GameController.addToGameLoop(TankController.Move);
    }

}
