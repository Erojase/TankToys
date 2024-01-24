import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { BulletController } from "../../controllers/BulletController";

interface BulletComponentProps {
    width: number;
    heigth: number;
}

@Component({
    selector: 'app-bullet',
    standalone: true,
    templateUrl: './bullet.component.html',
    styleUrls: ['./bullet.component.css'],
    imports: [CommonModule]
})
export class BulletComponent implements OnInit {
    @Input() props: BulletComponentProps;

    IGameController = GameController;
    IBulletController = BulletController;

    position = BulletController.bullet.position;

    constructor() { }

    ngOnInit() {
        GameController.addToGameLoop(this.bulletPosition);
        console.log("bulletController rendered");
    }

    setStyles() {
        return {
            "position": 'absolute',
            "zIndex": 60,
            "width": this.props.width,
            "height": this.props.heigth, 
            "top": this.position.y,
            "left": this.position.x,
            "rotate": `${BulletController.bullet.rotation}rad`
        }
    }

    bulletPosition(){
        this.position = BulletController.bullet.position;
    }

}
