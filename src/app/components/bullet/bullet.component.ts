import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { BulletController } from "../../controllers/BulletController";
import { Bullet } from '../../models/Bullet';
import { TankController } from '../../controllers/TankController';
import { CPUController } from '../../controllers/CPUController';

@Component({
    selector: 'app-bullet',
    standalone: true,
    templateUrl: './bullet.component.html',
    styleUrls: ['./bullet.component.css'],
    imports: [CommonModule]
})
export class BulletComponent implements OnInit {
    @Input("type") type: "player" | "CPU";

    bullet : Bullet;

    constructor() {
        this.bullet = new Bullet();

        
     }

    ngOnInit() {
        console.log(this.type);
        
        if (this.type == "player") {
            TankController.bullets.push(this.bullet);
        } else {
            CPUController.bullet = this.bullet;
        }
    }

    setStyles() {
        return {
            "position": 'absolute',
            "zIndex": 60,
            "width": "30px",
            "height": "20px",
            "top": `${this.bullet.position.y}px`,
            "left": `${this.bullet.position.x}px`,
            "rotate": `${this.bullet.rotation}rad`
        }
    }

}
