import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { BulletController } from "../../controllers/BulletController";
import { Bullet } from '../../models/Bullet';
import { TankController } from '../../controllers/TankController';

@Component({
    selector: 'app-bullet',
    standalone: true,
    templateUrl: './bullet.component.html',
    styleUrls: ['./bullet.component.css'],
    imports: [CommonModule]
})
export class BulletComponent implements OnInit {

    bullet : Bullet;

    constructor() {
        this.bullet = new Bullet();
        TankController.bullets.push(this.bullet);
     }

    ngOnInit() {
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
