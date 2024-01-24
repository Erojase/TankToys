import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankController } from "../../controllers/TankController";
import { GameController } from "../../controllers/GameController";

interface ScopeComponentProps {
    width: number;
    heigth: number;
}

@Component({
    selector: 'app-scope',
    standalone: true,
    templateUrl: './scope.component.html',
    styleUrls: ['./scope.component.css'],
    imports: [CommonModule]
})
export class ScopeComponent implements OnInit {
    @Input() props: ScopeComponentProps;

    ITankController = TankController;
    IGameController = GameController;

    position = TankController.scopePos;

    constructor() {

    }

    setStyles() {
        return {
            "position": 'absolute',
            "pointerEvents": "none",
            "zIndex": 100,
            "width": this.props.width,
            "height": this.props.heigth,
            "top": this.position.y - (this.props.width / 2),
            "left": this.position.x - (this.props.heigth / 2)
        }
    }

    scopePosition() {
        this.position = TankController.scopePos;
    }


    ngOnInit() {
        GameController.addToGameLoop(this.scopePosition);
        console.log("ScopeComponent rendered");
    }

}
