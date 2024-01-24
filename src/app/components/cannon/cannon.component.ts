import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";

interface CannonComponentProps {
    width: number;
    heigth: number;
    rotation: number;
}

@Component({
    selector: 'app-cannon',
    templateUrl: './cannon.component.html',
    standalone: true,
    styleUrls: ['./cannon.component.css'],
    imports: [CommonModule]
})
export class CannonComponent implements OnInit {
    @Input() props: CannonComponentProps;

    ITankController = TankController;
    IGameController = GameController;

    rotation = TankController.scopePos;

    constructor() { }

    setStyles() {
        return {
            'position': 'relative',
            'zIndex': 55,
            'width': this.props.width,
            'height': this.props.heigth,
            'rotate': `${TankController.cannonRotation}rad`
        };
    }

    cannonRotation() {
        this.rotation = TankController.scopePos;
    }

    ngOnInit() {
        GameController.addToGameLoop(this.cannonRotation)
    }

}
