import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dimensions } from '../../utils/utils';
import { BulletController } from "../../controllers/BulletController";
import { TankController } from "../../controllers/TankController";
import { ScopeComponent } from "../scope/scope.component";
import { TankComponent } from "../tank/tank.component";
import { BulletComponent } from "../bullet/bullet.component";
import { MapComponent } from "../map/map.component";
import { GameMap } from "../../models/Map";

@Component({
    selector: 'app-mainCanvas',
    standalone: true,
    templateUrl: './mainCanvas.component.html',
    styleUrls: ['./mainCanvas.component.css'],
    imports: [
        CommonModule,
        ScopeComponent,
        TankComponent,
        BulletComponent,
        MapComponent
    ]
})
export class MainCanvasComponent implements OnInit {
    IGameMap = GameMap;
    ITankController = TankController;

    currentWindow: dimensions = {
        height: 0,
        width: 0
    }

    constructor() { }

    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent){
        TankController.scopePlacement(e);
    }

    @HostListener('click', ['$event'])
    onClick(e: Event){
        BulletController.shoot();
    }

    setDivStyles(){
        return {
            "border": "1px solid black", 
            "height": this.currentWindow.height, 
            "width": this.currentWindow.width
        }
    }

    ngOnInit() {
        this.currentWindow = {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }

}
