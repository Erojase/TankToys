import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";

@Component({
    selector: 'app-cannon',
    templateUrl: './cannon.component.html',
    standalone: true,
    styleUrls: ['./cannon.component.scss'],
    imports: [CommonModule]
})
export class CannonComponent implements OnInit {
    @Input() width: number;
    @Input() heigth: number;
    @Input() rotation: number;

    constructor() {}

    setStyles() {
        return {
            'position': 'relative',
            'zIndex': 55,
            'width': `${this.width}px`,
            'height': `${this.heigth}px`,
            'rotate': `${this.rotation}rad`
        };
    }


    ngOnInit() {
        
    }

}
